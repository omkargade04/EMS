import { NextFunction } from "express";
import { Request, Response } from 'express';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import { client } from "../model/db";
import { QueryResult } from "pg";

export const isUserAuthenticated = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = `SELECT * FROM user_token WHERE token=$1`;
    const authHeader = req.header('Authorization');
    const token = authHeader ? authHeader.replace('Bearer ', '') : null;
    const value: any[] = [token];
    const data: QueryResult<any> = await client.query(query, value);
    
    if (data.rowCount === null) {
      return res.json({ status: false, message: "No user" });
    }
    if (data.rowCount < 1) {
      return res
        .status(401)
        .json({ status: false, message: "Unauthorized user!" });
    }

    const role = data.rows[0].role;

    if (role == "Student") {
      const id = data.rows[0].fk_student;
      const studentQuery = `SELECT * FROM students WHERE student_id = $1`;
      const studentQueryParams = [id];
      const studentQueryData = await client.query(
        studentQuery,
        studentQueryParams
      );

      req.student = studentQueryData.rows[0];
      req.token = token;
      next();
    } else if (role == "Educator") {
      const id = data.rows[0].fk_educator;
      const educatorQuery = `SELECT * FROM educators WHERE educator_id = $1`;
      const educatorQueryParams = [id];
      const educatorQueryData = await client.query(
        educatorQuery,
        educatorQueryParams
      );

      req.educator = educatorQueryData.rows[0];
      req.token = token;
      next();
    }
  } catch (err: any) {}
};

export const generateUserToken = async (user_id: number, role: string) => {
  try {
    console.log(user_id);
    const timestamp = new Date();
    const key = process.env.TOKEN_SECRET || "default_secret_token";
    const token = jwt.sign({ id: user_id }, key, { expiresIn: "24h" });
    if(role === 'Educator'){
      const tokenRecord: string = `INSERT INTO user_token(token, fk_educator, role, created_at) VALUES($1, $2, $3, $4)`;
      const values: any[] = [token, user_id, role, timestamp];
      await client.query(tokenRecord, values);
      return token;
    }
    else if(role === 'Student'){
      const tokenRecord: string = `INSERT INTO user_token(token, fk_student, role, created_at) VALUES($1, $2, $3, $4)`;
      const values: any[] = [token, user_id, role, timestamp];
      await client.query(tokenRecord, values);
      return token;
    }

  } catch (err: any) {
    console.log(err);
  }
};
