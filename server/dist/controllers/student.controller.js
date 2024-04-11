"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config;
const db_1 = require("../model/db");
require("dotenv").config();
const stripe_1 = require("../lib/stripe");
const enrollForACourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course_id = req.params.id;
    const student_id = req.student.student_id;
    if (!course_id) {
        return res.status(400).json({ stauts: false, message: "Course not found" });
    }
    try {
        // Check if the student has already enrolled in the course
        const checkQuery = `
        SELECT EXISTS (
          SELECT student_id
          FROM students
          WHERE student_id = $1
          AND $2 = ANY(applied_courses)
        ) AS enrolled
      `;
        const checkParam = [student_id, course_id];
        const checkResult = yield db_1.client.query(checkQuery, checkParam);
        const { enrolled } = checkResult.rows[0];
        if (enrolled) {
            return res.status(400).json({
                status: false,
                message: "Student already enrolled in the course",
            });
        }
        //details of student
        const studentQuery = `SELECT * FROM students WHERE student_id=$1`;
        const studentParam = [student_id];
        const studentResult = yield db_1.client.query(studentQuery, studentParam);
        const appliedCourses = studentResult.rows[0].applied_courses;
        appliedCourses.push(course_id);
        //updating applied course
        const updateQuery = `UPDATE students SET applied_courses = $1 WHERE student_id = $2`;
        const updateParam = [appliedCourses, student_id];
        const updateResult = yield db_1.client.query(updateQuery, updateParam);
        console.log("updated result: ", updateResult);
        console.log(studentResult.rows[0]);
        res.status(200).json({ status: true, message: "Enrolled for the course" });
    }
    catch (err) {
        console.log("This is error: ", err);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
});
const courseCheckout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course_id = req.params.id;
        const student_id = req.student.student_id;
        const student_email = req.student.email;
        const courseQuery = `SELECT * FROM course WHERE id=${course_id}`;
        const courseData = yield db_1.client.query(courseQuery);
        console.log(courseData.rows[0]);
        const course = courseData.rows[0];
        const line_items = [
            {
                quantity: 1,
                price_data: {
                    currency: "INR",
                    product_data: {
                        name: course.title,
                        description: course.description,
                    },
                    unit_amount: Math.round(course.price * 100),
                },
            },
        ];
        let stripeQuery = `SELECT * FROM stripeCustomer WHERE fk_student=${student_id}`;
        let stripeCustomer = yield db_1.client.query(stripeQuery);
        // console.log("Stripe Customer Row count: ",stripeCustomer.rowCount)
        if (stripeCustomer.rowCount === 0) {
            const customer = yield stripe_1.stripe.customers.create({
                email: student_email,
            });
            const stripeQuery = `INSERT INTO stripeCustomer(fk_student, stripe_id) VALUES($1, $2)`;
            const stripeParams = [student_id, customer.id];
            yield db_1.client.query(stripeQuery, stripeParams);
            console.log(customer.id);
            const getCustomer = `SELECT * FROM stripeCustomer WHERE stripe_id=$1`;
            const values = [customer.id];
            stripeCustomer = yield db_1.client.query(getCustomer, values);
        }
        console.log("Stripe Customer Data: ", stripeCustomer.rows[0]);
        const session = yield stripe_1.stripe.checkout.sessions.create({
            customer: stripeCustomer.rows[0].stripe_id,
            line_items,
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course_id}?success=1`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course_id}?canceled=1`,
            metadata: {
                courseId: course_id,
                studentId: student_id,
            },
        });
        res
            .status(200)
            .json({ status: true, url: session.url, message: "Proceed to payment" });
    }
    catch (err) {
        console.log("error: ", err);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
});
const purchaseCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.id;
        const studentId = req.student.student_id;
        const query = `INSERT INTO purchase(fk_student, fk_course) VALUES($1, $2)`;
        const params = [studentId, courseId];
        const result = yield db_1.client.query(query, params);
        console.log(result);
        res.status(200).json({ status: true, message: "Course purchased" });
    }
    catch (err) {
        console.log("error: ", err);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
});
const getMyCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student_id = req.student.student_id;
        const page = req.query.page ? parseInt(String(req.query.page)) : 1;
        const limit = req.query.limit ? parseInt(String(req.query.limit)) : 3;
        const offset = (page - 1) * limit;
        const getQuery = `SELECT c.id, c.title, c.description, c.imageUrl, c.price 
                      FROM course AS c 
                      JOIN purchase AS p ON c.id = p.fk_course 
                      WHERE p.fk_student = ${student_id}
                      LIMIT ${limit} OFFSET ${offset}`;
        const result = yield db_1.client.query(getQuery);
        const data = result.rows;
        res.status(200).json({
            status: true,
            data: data,
            message: "Retrieved all student courses",
        });
    }
    catch (err) {
        console.log("Error: ", err);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
});
const alreadyPurchased = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.id;
        const query = `SELECT * FROM purchase WHERE fk_coures = ${courseId}`;
        const result = yield db_1.client.query(query);
        if (result.rowCount === 0) {
            return res.status(200).json({ status: true, message: "Proceed to payment" });
        }
        res.status(400).json({ status: false, message: "Already applied for the course" });
    }
    catch (err) {
        console.log("Error: ", err);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
});
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.token) {
        return res.status(401).json({ error: "You are already logged out" });
    }
    const removeStudent = "DELETE FROM student_token WHERE token = $1";
    const value = [req.token];
    try {
        const result = yield db_1.client.query(removeStudent, value);
        return res
            .status(200)
            .json({ success: "Student logged out successfully!" });
    }
    catch (err) {
        return res
            .status(500)
            .json({ error: "An error occurred while logging out" });
    }
});
module.exports = {
    enrollForACourse,
    getMyCourses,
    courseCheckout,
    purchaseCourse,
    alreadyPurchased,
    logout,
};
