import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import bcrypt from "bcryptjs";
import { client } from "../model/db";
import { ReqMid } from "../types/educator";
import { QueryResult } from "pg";
require("dotenv").config();


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

export const logout = async (req: ReqMid, res: any) => {
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

module.exports = { createCourse, educatorVerification, logout };
