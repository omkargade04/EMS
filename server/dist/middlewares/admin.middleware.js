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
exports.generateAdminToken = exports.isAdminAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./config.env" });
const db_1 = require("../model/db");
const isAdminAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `SELECT * FROM admin_token WHERE token=$1`;
        const authHeader = req.header("Authorization");
        const token = authHeader ? authHeader.replace("Bearer ", "") : null;
        const value = [token];
        const data = yield db_1.client.query(query, value);
        if (data.rowCount === null) {
            return res.json({ status: false, message: "No admin" });
        }
        if (data.rowCount < 1) {
            return res
                .status(401)
                .json({ status: false, message: "Unauthorized admin!" });
        }
        const adminId = data.rows[0].fk_admin;
        const adminQuery = `SELECT * FROM admins WHERE admin_id = $1`;
        const adminQueryParams = [adminId];
        const adminQueryData = yield db_1.client.query(adminQuery, adminQueryParams);
        req.admin = adminQueryData.rows[0];
        req.token = token;
        next();
    }
    catch (err) { }
});
exports.isAdminAuthenticated = isAdminAuthenticated;
const generateAdminToken = (admin_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("this is admin id: ", admin_id);
        const timestamp = new Date();
        const key = process.env.TOKEN_SECRET || "default_secret_token";
        const token = jsonwebtoken_1.default.sign({ id: admin_id }, key, { expiresIn: "24h" });
        const tokenRecord = `INSERT INTO admin_token(token, fk_admin, created_at) VALUES($1, $2, $3)`;
        const values = [token, admin_id, timestamp];
        yield db_1.client.query(tokenRecord, values);
        return token;
    }
    catch (err) {
        console.log(err);
    }
});
exports.generateAdminToken = generateAdminToken;
