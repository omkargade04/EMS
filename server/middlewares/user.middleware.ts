import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import { client } from "../model/db";
import { QueryResult } from "pg";
import { ReqMid } from "../types/educator";

export const isStudentAuthenticated = async (
  req: any,
  res: any,
  next: NextFunction
) => {
  try {
    const query = `SELECT * FROM student_token WHERE token=$1`;
    const authHeader = req.header("Authorization");
    const token = authHeader ? authHeader.replace("Bearer ", "") : null;
    const value: any[] = [token];
    const data: QueryResult<any> = await client.query(query, value);

    if (data.rowCount === null) {
      return res.json({ status: false, message: "No student" });
    }
    if (data.rowCount < 1) {
      return res
        .status(401)
        .json({ status: false, message: "Unauthorized student!" });
    }
    const studentId = data.rows[0].fk_student;
    const studentQuery = `SELECT * FROM students WHERE student_id = $1`;
    const studentQueryParams = [studentId];
    const studentQueryData = await client.query(studentQuery, studentQueryParams);

    req.student = studentQueryData.rows[0];
    req.token = token;
    next();
  } catch (err: any) {}
};
export const generateStudentToken = async (user_id: number) => {
  try {
    console.log(user_id);
    const timestamp = new Date();
    const key = process.env.TOKEN_SECRET || "default_secret_token";
    const token = jwt.sign({ id: user_id }, key, { expiresIn: "24h" });
    const tokenRecord: string = `INSERT INTO student_token(token, fk_student, created_at) VALUES($1, $2, $3)`;
    const values: any[] = [token, user_id, timestamp];
    await client.query(tokenRecord, values);
    return token;
  } catch (err: any) {
    console.log(err);
  }
};

export const isEducatorAuthenticated = async (
  req: any,
  res: any,
  next: NextFunction
) => {
  try {
    const query = `SELECT * FROM educator_token WHERE token=$1`;
    // const authHeader = req.header("Authorization");
    const token = req.body.token;
    const value: any[] = [token];
    const data: QueryResult<any> = await client.query(query, value);
    console.log(token)
    if (data.rowCount === null) {
      return res.json({ status: false, message: "No Educator" });
    }
    if (data.rowCount < 1) {
      return res
        .status(401)
        .json({ status: false, message: "Unauthorized Educator!" });
    }
    const educatorId = data.rows[0].fk_educator;
    const educatorQuery = `SELECT * FROM educators WHERE educator_id = $1`;
    const educatorQueryParams = [educatorId];
    const educatorQueryData = await client.query(educatorQuery, educatorQueryParams);

    req.educator = educatorQueryData.rows[0];
    req.token = token;
    next();
  } catch (err: any) {}
};
export const generateEducatorToken = async (user_id: number) => {
  try {
    console.log(user_id);
    const timestamp = new Date();
    const key = process.env.TOKEN_SECRET || "default_secret_token";
    const token = jwt.sign({ id: user_id }, key, { expiresIn: "24h" });
    const tokenRecord: string = `INSERT INTO educator_token(token, fk_educator, created_at) VALUES($1, $2, $3)`;
    const values: any[] = [token, user_id, timestamp];
    await client.query(tokenRecord, values);
    return token;
  } catch (err: any) {
    console.log(err);
  }
};