import express, { Request, Response, Application, urlencoded } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import { generateAdminToken } from "../middlewares/admin.middleware";
import bcrypt from "bcryptjs";
import { client } from "../model/db";
import { ReqMid } from "../types/user";
import { QueryResult } from "pg";
require("dotenv").config();

const signup = async (req: Request, res: Response) => {
  const { name, password } = req.body;
  console.log(req.body);
  if (!name || !password) {
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
    const insertAdmin: string =
      "INSERT INTO admins(name, password, created_at, updated_at) VALUES($1, $2, $3, $4) RETURNING name, created_at";
    // Hash the user's password using bcrypt
    const hashPassword = await bcrypt.hash(password, 10);
    // Prepare the values for the SQL query
    console.log(hashPassword);
    const values: any[] = [
      name,
      hashPassword,
      timeStamp,
      timeStamp,
    ];
    // Execute the SQL query to insert the user data into the database
    const result: QueryResult<any> = await client.query(insertAdmin, values);
    const data = result.rows;

    console.log(data); // Log the data returned by the query (for debugging purposes)

    // Send a success response to the client
    res
      .status(200)
      .json({ status: true, message: "Admin created successfully." });
  } catch (err: any) {
    // Handle errors that occurred during the database operation
      // For other errors, log the error and send a 500 Internal Server Error response
      console.log(err);
      res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

const signin = async (req: ReqMid, res: Response) => {
  const { name, password } = req.body;
  console.log(name);
  console.log(password);
  if (!name || !password) {
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
    const query = `SELECT * FROM admins WHERE name=$1`;
    const param = [name];
    const data: QueryResult<any> = await client.query(query, param);
    console.log(data.rows[0]);

    if (data.rowCount === 1) {
      const auth = await bcrypt.compare(password, data.rows[0].password);
      if (auth) {
        const token = await generateAdminToken(data.rows[0].admin_id);
        const admin = data.rows[0];
        delete admin.password;
        return res.json({
          status: true,
          token: token,
          admin: admin,
          message: "Admin signed in successfully",
        });
      } else {
        return res
          .status(400)
          .json({ status: false, message: "Invalid password" });
      }
    } else {
      return res.status(400).json({ status: false, message: "User Not Found" });
    }
  } catch (err: any) {
    return res.status(400).json({ status: false, message: err.message });
  }
};


module.exports = { signup, signin };
