import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import { client } from "../model/db";
import { QueryResult } from "pg";

export const isAdminAuthenticated = async (
  req: any,
  res: any,
  next: NextFunction
) => {
  try {
    const query = `SELECT * FROM admin_token WHERE token=$1`;
    const authHeader = req.header("Authorization");
    const token = authHeader ? authHeader.replace("Bearer ", "") : null;
    const value: any[] = [token];
    const data: QueryResult<any> = await client.query(query, value);

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
    const adminQueryData = await client.query(adminQuery, adminQueryParams);

    req.admin = adminQueryData.rows[0];
    req.token = token;
    next();
  } catch (err: any) {}
};
export const generateAdminToken = async (admin_id: number) => {
  try {
    console.log("this is admin id: ",admin_id);
    const timestamp = new Date();
    const key = process.env.TOKEN_SECRET || "default_secret_token";
    const token = jwt.sign({ id: admin_id }, key, { expiresIn: "24h" });
    const tokenRecord: string = `INSERT INTO admin_token(token, fk_admin, created_at) VALUES($1, $2, $3)`;
    const values: any[] = [token, admin_id, timestamp];
    await client.query(tokenRecord, values);
    return token;
  } catch (err: any) {
    console.log(err);
  }
};
