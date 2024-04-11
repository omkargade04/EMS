import express, { Request, Response, Application, urlencoded } from "express";
import jwt from "jsonwebtoken";
require('dotenv').config

import bcrypt from "bcryptjs";
import { client } from "../model/db";
import { generateUserToken } from "../middlewares/user.middleware";
import { ReqMid } from "../types/student";
import { QueryResult } from "pg";
require("dotenv").config();

const educatorSignup = async (req: Request, res: Response) => {
  const { name, email, password, experience, institute, role } = req.body;
  console.log(req.body);
  if (!name || !email || !password || !experience || !institute || !role) {
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
      "INSERT INTO educators(name, email, password, experience, institute, role, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING name, email, role, created_at";
    // Hash the user's password using bcrypt
    const hashPassword = await bcrypt.hash(password, 10);
    // Prepare the values for the SQL query
    console.log(hashPassword);
    const values: any[] = [name, email, hashPassword, experience, institute, role, timeStamp, timeStamp];
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

const studentSignup = async (req: Request, res: Response) => {
    const { name, email, role, password } = req.body;
    console.log(req.body);
    if (!name || !email || !password || !role) {
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
      const insertStudent: string =
        "INSERT INTO students(name, email, password, role, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6) RETURNING name, email, role, created_at";
      // Hash the user's password using bcrypt
      const hashPassword = await bcrypt.hash(password, 10);
      // Prepare the values for the SQL query
      console.log(hashPassword);
      const values: any[] = [name, email, hashPassword, role, timeStamp, timeStamp];
      // Execute the SQL query to insert the student data into the database
      const result: QueryResult<any> = await client.query(insertStudent, values);
      const data = result.rows;
  
      console.log(data); // Log the data returned by the query (for debugging purposes)
  
      // Send a success response to the client
      res
        .status(200)
        .json({ status: true, message: "Student created successfully." });
    } catch (err: any) {
      // Handle errors that occurred during the database operation
  
      // Extract the duplicate error message from the error object
      const duplicateError: string = err.message
        .split(" ")
        .pop()
        .replaceAll('"', "");
  
      if (duplicateError === "user_email_key") {
        // If a user with the same email already exists, send a 409 Conflict response
        res.status(409).json({ error: "User with this email already exists." });
      } else {
        // For other errors, log the error and send a 500 Internal Server Error response
        console.log(err);
        res.status(500).json({ status: false, message: "Internal Server Error" });
      }
    }
  };

const signin = async(req: any, res: any) => {
    const { email, role, password } = req.body;
    console.log(email);
    console.log(role);
    console.log(password);
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ error: true, message: "All fields are required" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ status: false, content: { message: "Password is required" } });
    }
    if(role === "Educator"){
        try {
            const query = `SELECT * FROM educators WHERE email=$1`;
            const param = [email];
            const data: QueryResult<any> = await client.query(query, param);
            console.log(data.rows[0]);
        
            if (data.rowCount === 1) {
              const auth = await bcrypt.compare(password, data.rows[0].password);
              if (auth) {
                const token = await generateUserToken(data.rows[0].educator_id, role);
                const educator = data.rows[0];
                delete educator.password;
                return res.json({
                  status: true,
                  token: token,
                  user: educator,
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
    }
    else if(role === "Student"){
        try {
            const query = `SELECT * FROM students WHERE email=$1`;
            const param = [email];
            const data: QueryResult<any> = await client.query(query, param);
            console.log(data.rows[0]);
        
            if (data.rowCount === 1) {
              const auth = await bcrypt.compare(password, data.rows[0].password);
              if (auth) {
                const token = await generateUserToken(data.rows[0].student_id, role);
                const student = data.rows[0];
                delete student.password;
                return res.json({
                  status: true,
                  token: token,
                  user: student,
                  message: "Student signed in successfully",
                });
              } else {
                return res
                  .status(400)
                  .json({ status: false, message: "Invalid password" });
              }
            } else {
              return res
                .status(400)
                .json({ status: false, message: "Student Not Found" });
            }
          } catch (err: any) {
            return res.status(400).json({ status: false, message: err.message });
          }
    }
}

const logout = async (req: ReqMid, res: any) => {
  if (!req.token) {
    return res.status(401).json({ error: "You are already logged out" });
  }

  console.log(req.token)

  const removeUser: string = "DELETE FROM user_token WHERE token = $1";

  const value: any[] = [req.token];

  try {
    const result: QueryResult<any> = await client.query(removeUser, value);

    return res.status(200).json({ success: "User logged out successfully!" });
  } catch (err: any) {
    return res
      .status(500)
      .json({ error: "An error occurred while logging out" });
  }
};

module.exports = { studentSignup, educatorSignup, signin, logout };
