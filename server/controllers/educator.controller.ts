import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import bcrypt from "bcryptjs";
import { client } from "../model/db";
import { ReqMid } from "../types/educator";
import { QueryResult } from "pg";
require("dotenv").config();


const createCourse = async(req: ReqMid, res: any) => {
  try{
    const educator_id = req.educator.educator_id;
    const {title} = req.body;
    console.log(title);
    const query: string = `INSERT INTO course(fk_educator, title) VALUES($1, $2)`;
    const params: any[] = [educator_id, title];
    const result = await client.query(query, params);
    console.log(result.rowCount);

    const getquery: string = `SELECT * FROM course WHERE title=$1 `;
    const getparams: any[] = [title];
    const getresult = await client.query(getquery, getparams);
    const data = getresult.rows[0]
    console.log(data);
    res.status(200).json({status: true, data: data, message: "New Course created"});
  }catch(err: any){
    console.log('Error: ', err);
    res.status(500).json({status: false, message: "Internal server error"});
  }
}

const educatorsCourses = async(req: ReqMid, res: any) => {
  try{
    const educator_id = req.educator.educator_id;
    console.log("Educator id: ", educator_id);

    const getCoursesQuery: string = `SELECT * FROM courses WHERE fk_educator = $1`;
    const getCoursesParam: any[] = [educator_id];
    const getcourseResult: QueryResult<any> = await client.query(getCoursesQuery, getCoursesParam);
    const data = getcourseResult.rows;

    if(getcourseResult.rowCount === 0){
      return res.status(400).json({status: false, message: "No course found"});
    }

    res.status(200).json({status: true, data: data, message: "Educator's courses retrived"});
  }catch(err: any){
    console.log("This is Error: ", err);
    res.status(500).json({status: false, message: "Internal server error"});
  }
}

const getMyCourses = async (req: ReqMid, res: any) => {
  try {
    const educator_id = req.educator.educator_id;
    const page = req.query.page ? parseInt(String(req.query.page)) : 1; 
    const limit = req.query.limit ? parseInt(String(req.query.limit)) : 3; 

    const offset = (page - 1) * limit;
    const query = `SELECT * FROM course WHERE fk_educator=${educator_id} LIMIT ${limit} OFFSET ${offset}`;
    const data = await client.query(query);

    res.status(200).json({
      status: true,
      data: data.rows,
      message: "Educator's courses retrieved",
    });
  } catch (err: any) {
    console.log("Error: ", err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

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

const logout = async (req: ReqMid, res: any) => {
  if (!req.token) {
    return res.status(401).json({ error: "You are already logged out" });
  }

  console.log(req.token)

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

module.exports = { createCourse, educatorVerification, educatorsCourses, getMyCourses, logout };
