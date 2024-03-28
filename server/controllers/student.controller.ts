import express, { Request, Response, Application, urlencoded } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import { generateStudentToken } from "../middlewares/user.middleware";
import bcrypt from "bcryptjs";
import { client } from "../model/db";
import { ReqMid } from "../types/student";
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
    const insertStudent: string =
      "INSERT INTO students(name, email, password, created_at, updated_at) VALUES($1, $2, $3, $4, $5) RETURNING name, email, created_at";
    // Hash the user's password using bcrypt
    const hashPassword = await bcrypt.hash(password, 10);
    // Prepare the values for the SQL query
    console.log(hashPassword);
    const values: any[] = [name, email, hashPassword, timeStamp, timeStamp];
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
    const query = `SELECT * FROM students WHERE email=$1`;
    const param = [email];
    const data: QueryResult<any> = await client.query(query, param);
    console.log(data.rows[0]);

    if (data.rowCount === 1) {
      const auth = await bcrypt.compare(password, data.rows[0].password);
      if (auth) {
        const token = await generateStudentToken(data.rows[0].student_id);
        const student = data.rows[0];
        delete student.password;
        return res.json({
          status: true,
          token: token,
          student: student,
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
};

const enrollForACourse = async (req: ReqMid, res: any) => {
  const course_id = req.params.id;
  const student_id = req.student.student_id;

  if (!course_id) {
    return res.status(400).json({ stauts: false, message: "Course not found" });
  }

  try {
    // Check if the student has already enrolled in the course
    const checkQuery: string = `
        SELECT EXISTS (
          SELECT student_id
          FROM students
          WHERE student_id = $1
          AND $2 = ANY(applied_courses)
        ) AS enrolled
      `;
    const checkParam: any[] = [student_id, course_id];
    const checkResult = await client.query(checkQuery, checkParam);
    const { enrolled } = checkResult.rows[0];

    if (enrolled) {
      return res
        .status(400)
        .json({
          status: false,
          message: "Student already enrolled in the course",
        });
    }

    //details of student
    const studentQuery: string = `SELECT * FROM students WHERE student_id=$1`;
    const studentParam: any[] = [student_id];
    const studentResult = await client.query(studentQuery, studentParam);

    const appliedCourses = studentResult.rows[0].applied_courses;

    appliedCourses.push(course_id);

    //updating applied course
    const updateQuery: string = `UPDATE students SET applied_courses = $1 WHERE student_id = $2`;
    const updateParam: any[] = [appliedCourses, student_id];
    const updateResult = await client.query(updateQuery, updateParam);

    console.log("updated result: ", updateResult);

    console.log(studentResult.rows[0]);

    res.status(200).json({ status: true, message: "Enrolled for the course" });

  } catch (err: any) {
    console.log("This is error: ", err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

const logout = async (req: ReqMid, res: Response) => {
  if (!req.token) {
    return res.status(401).json({ error: "You are already logged out" });
  }

  const removeStudent: string = "DELETE FROM student_token WHERE token = $1";

  const value: any[] = [req.token];

  try {
    const result: QueryResult<any> = await client.query(removeStudent, value);

    return res.status(200).json({ success: "Student logged out successfully!" });
  } catch (err: any) {
    return res
      .status(500)
      .json({ error: "An error occurred while logging out" });
  }
};

module.exports = { signup, signin, enrollForACourse, logout };
