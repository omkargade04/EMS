import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import { client } from "../model/db";
import { ReqMid } from "../types/student";
import { QueryResult } from "pg";
require("dotenv").config();


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

const logout = async (req: ReqMid, res: any) => {
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

module.exports = { enrollForACourse, logout };
