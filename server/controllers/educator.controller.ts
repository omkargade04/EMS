import express, { Request, Response, Application, urlencoded } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import { generateEducatorToken } from "../middlewares/user.middleware";
import bcrypt, { hash } from "bcryptjs";
import { client } from "../model/db";
import { ReqMid } from "../types/educator";
import { QueryResult } from "pg";
require("dotenv").config();

const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  if (!name || !email || !password) {
    console.log("Fill all details", req.body);
    return res
      .status(401)
      .json({ status: false, message: "Fill all the fields" });
  }
  try {
    console.log("Inserting all fields ", req.body);
    // Get the current timestamp in ISO format
    const timeStamp: string = new Date().toISOString();

    // Insert data into users table
    const insertEducator: string =
      "INSERT INTO educators(name, email, password, created_at, updated_at) VALUES($1, $2, $3, $4, $5) RETURNING name, email, created_at";
    // Hash the user's password using bcrypt
    const hashPassword = await bcrypt.hash(password, 10);
    // Prepare the values for the SQL query
    console.log(hashPassword);
    const values: any[] = [
      name,
      email,
      hashPassword,
      timeStamp,
      timeStamp,
    ];
    // Execute the SQL query to insert the student data into the database
    const result: QueryResult<any> = await client.query(insertEducator, values);
    const data = result.rows;

    console.log(data); // Log the data returned by the query (for debugging purposes)

    // Send a success response to the client
    res
      .status(200)
      .json({ status: true, message: "Educator created successfully." });
  } catch (err: any) {
    // Handle errors that occurred during the database operation

    // Extract the duplicate error message from the error object
    const duplicateError: string = err.message
      .split(" ")
      .pop()
      .replaceAll('"', "");

    if (duplicateError === "user_email_key") {
      // If a user with the same email already exists, send a 409 Conflict response
      res.status(409).json({ error: "Educator with this email already exists." });
    } else {
      // For other errors, log the error and send a 500 Internal Server Error response
      console.log(err);
      res.status(500).json({ status: false, message: "Internal Server Error" });
    }
  }
};

const signin = async (req: ReqMid, res: Response) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: true, message: "All fields are required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ status: false, content: { message: "Password is required" } });
  }
  try {
    const query = `SELECT * FROM educators WHERE email=$1`;
    const param = [email];
    const data: QueryResult<any> = await client.query(query, param);
    console.log(data.rows[0]);

    if (data.rowCount === 1) {
      const auth = await bcrypt.compare(password, data.rows[0].password);
      if (auth) {
        const token = await generateEducatorToken(data.rows[0].educator_id);
        const educator = data.rows[0];
        delete educator.password;
        return res.json({
          status: true,
          token: token,
          educator: educator,
          message: "Educator signed in successfully",
        });
      } else {
        return res
          .status(400)
          .json({ status: false, message: "Invalid password" });
      }
    } else {
      return res.status(400).json({ status: false, message: "Educator Not Found" });
    }
  } catch (err: any) {
    return res.status(400).json({ status: false, message: err.message });
  }
};

const createCourse = async(req: ReqMid, res: any) => {
    const {course_title, course_description, course_price} = req.body;
    if(!course_title || !course_description){
        return res.status(400).json({status: false, message: "Please fill course details"});
    }
    if(!course_price){
        return res.status(400).json({status: false, message: "Please fill course price"});
    }
    const timestamp : string = new Date().toISOString();
    try{
        const educator_id = req.educator.educator_id;
        const courseQuery: string = `INSERT INTO courses(course_title, course_description, course_price, fk_educator, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6)`;
        const courseParams: any[] = [course_title, course_description, course_price, educator_id, timestamp, timestamp];
        const courseData = await client.query(courseQuery, courseParams);

        console.log(courseData);
        
        if(courseData.rowCount === 1){
            res.status(201).json({status: true, message: "New course created"});
        }else{
            res.status(400).json({status: false, message: "Error creating course"});
        }
    }catch(err: any){
        res.status(500).json({status: false, message: "Internal Server Error"});
    }
}

const educatorVerification = async(req: any, res: any) => {
  const {name, email, password} = req.body;
  if (!name || !email || !password) {
    console.log("Fill all details", req.body);
    return res
      .status(401)
      .json({ status: false, message: "Fill all the fields" });
  }

  try{
    const timestamp = new Date().toISOString();
    const insertQuery: string = `INSERT INTO educator_verification(name, email, password, created_at, updated_at) VALUES($1, $2, $3, $4, $5)`;
    const hashPassword = await bcrypt.hash(password, 10);
    const insertParams: any[] = [name, email, hashPassword, timestamp, timestamp];
    const insertData: QueryResult<any> = await client.query(insertQuery, insertParams);

    console.log(insertData.rows[0]);

    res
    .status(200)
    .json({ status: true, message: "Educator verification sent successfully." });
  }catch(err: any){
    console.log("This is error: ", err);
    res.status(500).json({status: false, message: "Internal server error"});
  }
}

const logout = async (req: ReqMid, res: Response) => {
  if (!req.token) {
    return res.status(401).json({ error: "You are already logged out" });
  }

  const removeEducator: string = "DELETE FROM educator_token WHERE token = $1";

  const value: any[] = [req.token];

  try {
    const result: QueryResult<any> = await client.query(removeEducator, value);

    return res.status(200).json({ success: "Educator logged out successfully!" });
  } catch (err: any) {
    return res
      .status(500)
      .json({ error: "An error occurred while logging out" });
  }
};

module.exports = { signup, signin, createCourse, educatorVerification, logout };
