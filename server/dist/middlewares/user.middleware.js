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
exports.generateUserToken = exports.isUserAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./config.env" });
const db_1 = require("../model/db");
const isUserAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `SELECT * FROM user_token WHERE token=$1`;
        const authHeader = req.header('Authorization');
        const token = authHeader ? authHeader.replace('Bearer ', '') : null;
        const value = [token];
        const data = yield db_1.client.query(query, value);
        console.log(authHeader);
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
            const studentQueryData = yield db_1.client.query(studentQuery, studentQueryParams);
            req.student = studentQueryData.rows[0];
            req.token = token;
            next();
        }
        else if (role == "Educator") {
            const id = data.rows[0].fk_educator;
            const educatorQuery = `SELECT * FROM educators WHERE educator_id = $1`;
            const educatorQueryParams = [id];
            const educatorQueryData = yield db_1.client.query(educatorQuery, educatorQueryParams);
            req.educator = educatorQueryData.rows[0];
            req.token = token;
            next();
        }
    }
    catch (err) { }
});
exports.isUserAuthenticated = isUserAuthenticated;
const generateUserToken = (user_id, role) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(user_id);
        const timestamp = new Date();
        const key = process.env.TOKEN_SECRET || "default_secret_token";
        const token = jsonwebtoken_1.default.sign({ id: user_id }, key, { expiresIn: "24h" });
        if (role === 'Educator') {
            const tokenRecord = `INSERT INTO user_token(token, fk_educator, role, created_at) VALUES($1, $2, $3, $4)`;
            const values = [token, user_id, role, timestamp];
            yield db_1.client.query(tokenRecord, values);
            return token;
        }
        else if (role === 'Student') {
            const tokenRecord = `INSERT INTO user_token(token, fk_student, role, created_at) VALUES($1, $2, $3, $4)`;
            const values = [token, user_id, role, timestamp];
            yield db_1.client.query(tokenRecord, values);
            return token;
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.generateUserToken = generateUserToken;
