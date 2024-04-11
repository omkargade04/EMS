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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../model/db");
require("dotenv").config();
const createCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const educator_id = req.educator.educator_id;
        const { title } = req.body;
        console.log(title);
        const query = `INSERT INTO course(fk_educator, title) VALUES($1, $2)`;
        const params = [educator_id, title];
        const result = yield db_1.client.query(query, params);
        console.log(result.rowCount);
        const getquery = `SELECT * FROM course WHERE title=$1 `;
        const getparams = [title];
        const getresult = yield db_1.client.query(getquery, getparams);
        const data = getresult.rows[0];
        console.log(data);
        res.status(200).json({ status: true, data: data, message: "New Course created" });
    }
    catch (err) {
        console.log('Error: ', err);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
});
const educatorsCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const educator_id = req.educator.educator_id;
        console.log("Educator id: ", educator_id);
        const getCoursesQuery = `SELECT * FROM courses WHERE fk_educator = $1`;
        const getCoursesParam = [educator_id];
        const getcourseResult = yield db_1.client.query(getCoursesQuery, getCoursesParam);
        const data = getcourseResult.rows;
        if (getcourseResult.rowCount === 0) {
            return res.status(400).json({ status: false, message: "No course found" });
        }
        res.status(200).json({ status: true, data: data, message: "Educator's courses retrived" });
    }
    catch (err) {
        console.log("This is Error: ", err);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
});
const getMyCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const educator_id = req.educator.educator_id;
        const page = req.query.page ? parseInt(String(req.query.page)) : 1;
        const limit = req.query.limit ? parseInt(String(req.query.limit)) : 3;
        const offset = (page - 1) * limit;
        const query = `SELECT * FROM course WHERE fk_educator=${educator_id} LIMIT ${limit} OFFSET ${offset}`;
        const data = yield db_1.client.query(query);
        res.status(200).json({
            status: true,
            data: data.rows,
            message: "Educator's courses retrieved",
        });
    }
    catch (err) {
        console.log("Error: ", err);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
});
const educatorVerification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, institute, experience } = req.body;
    if (!name || !email || !password) {
        console.log("Fill all details", req.body);
        return res
            .status(401)
            .json({ status: false, message: "Fill all the fields" });
    }
    try {
        const timestamp = new Date().toISOString();
        const insertQuery = `INSERT INTO educator_verification(name, email, password, institute, experience, created_at, updated_at) VALUES($1, $2, $3, $4, $5)`;
        const hashPassword = yield bcryptjs_1.default.hash(password, 10);
        const insertParams = [name, email, hashPassword, experience, institute, timestamp, timestamp];
        const insertData = yield db_1.client.query(insertQuery, insertParams);
        console.log(insertData.rows[0]);
        res
            .status(200)
            .json({ status: true, message: "Educator verification sent successfully." });
    }
    catch (err) {
        console.log("This is error: ", err);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
});
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.token) {
        return res.status(401).json({ error: "You are already logged out" });
    }
    console.log(req.token);
    const removeEducator = "DELETE FROM educator_token WHERE token = $1";
    const value = [req.token];
    try {
        const result = yield db_1.client.query(removeEducator, value);
        return res.status(200).json({ success: "Educator logged out successfully!" });
    }
    catch (err) {
        return res
            .status(500)
            .json({ error: "An error occurred while logging out" });
    }
});
module.exports = { createCourse, educatorVerification, educatorsCourses, getMyCourses, logout };
