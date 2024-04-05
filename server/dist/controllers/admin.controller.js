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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./config.env" });
const admin_middleware_1 = require("../middlewares/admin.middleware");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../model/db");
require("dotenv").config();
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const timeStamp = new Date().toISOString();
        // Insert data into users table
        const insertAdmin = "INSERT INTO admins(name, password, created_at, updated_at) VALUES($1, $2, $3, $4) RETURNING name, created_at";
        // Hash the user's password using bcrypt
        const hashPassword = yield bcryptjs_1.default.hash(password, 10);
        // Prepare the values for the SQL query
        console.log(hashPassword);
        const values = [
            name,
            hashPassword,
            timeStamp,
            timeStamp,
        ];
        // Execute the SQL query to insert the user data into the database
        const result = yield db_1.client.query(insertAdmin, values);
        const data = result.rows;
        console.log(data); // Log the data returned by the query (for debugging purposes)
        // Send a success response to the client
        res
            .status(200)
            .json({ status: true, message: "Admin created successfully." });
    }
    catch (err) {
        // Handle errors that occurred during the database operation
        // For other errors, log the error and send a 500 Internal Server Error response
        console.log(err);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const data = yield db_1.client.query(query, param);
        console.log(data.rows[0]);
        console.log("admin token process");
        if (data.rowCount !== 0) {
            const auth = yield bcryptjs_1.default.compare(password, data.rows[0].password);
            if (auth) {
                const token = yield (0, admin_middleware_1.generateAdminToken)(data.rows[0].admin_id);
                console.log(token);
                const admin = data.rows[0];
                delete admin.password;
                return res.json({
                    status: true,
                    token: token,
                    admin: admin,
                    message: "Admin signed in successfully",
                });
            }
            else {
                return res
                    .status(400)
                    .json({ status: false, message: "Invalid password" });
            }
        }
        else {
            return res.status(400).json({ status: false, message: "User Not Found" });
        }
    }
    catch (err) {
        return res.status(400).json({ status: false, message: err.message });
    }
});
const eductorVrificatonInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getQuery = `SELECT * FROM educator_verification`;
        const getData = yield db_1.client.query(getQuery);
        console.log(getData.rows);
        res.status(200).json({ status: true, data: getData.rows, message: "Fetched educators info" });
    }
    catch (err) {
        console.log("This is error: ", err);
        res.status(400).json({ status: false, message: err.message });
    }
});
const verifyingEducator = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const educator_id = req.params.id;
    if (!educator_id) {
        return res.status(400).json({ status: false, message: "No educator with this id exists" });
    }
    try {
        const getEducatorQuery = `SELECT * FROM educator_verification WHERE verification_id = $1`;
        const getEducatorParam = [educator_id];
        const getEducatorData = yield db_1.client.query(getEducatorQuery, getEducatorParam);
        const educator = getEducatorData.rows[0];
        console.log("This is educator: ", educator);
        const timestamp = new Date().toISOString();
        const insertQuery = `INSERT INTO educators(name, email, password, institute, experience, created_at, updated_at) VALUES($1, $2, $3, $4, $5)`;
        const insertParams = [educator.name, educator.email, educator.password, educator.institute, educator.experience, timestamp, timestamp];
        const insertData = yield db_1.client.query(insertQuery, insertParams);
        res
            .status(200)
            .json({ status: true, data: educator, message: "Educator verified successfully." });
    }
    catch (err) {
    }
});
const getAllStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getQuery = `SELECT * FROM students`;
        const result = yield db_1.client.query(getQuery);
        res.status(200).json({ status: true, data: result.rows, message: "All students retrieved" });
    }
    catch (err) {
    }
});
const getAllEducators = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getQuery = `SELECT * FROM educators`;
        const result = yield db_1.client.query(getQuery);
        res.status(200).json({ status: true, data: result.rows, message: "All educators retrieved" });
    }
    catch (err) {
    }
});
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.token) {
        return res.status(401).json({ error: "You are already logged out" });
    }
    const removeAdmin = "DELETE FROM admin_token WHERE token = $1";
    const value = [req.token];
    try {
        const result = yield db_1.client.query(removeAdmin, value);
        return res
            .status(200)
            .json({ success: "Admin logged out successfully!" });
    }
    catch (err) {
        return res
            .status(500)
            .json({ error: "An error occurred while logging out" });
    }
});
module.exports = { signup, signin, getAllStudents, getAllEducators, eductorVrificatonInfo, verifyingEducator, logout };
