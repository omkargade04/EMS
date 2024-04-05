import express, { Router } from 'express';
import { isAdminAuthenticated } from '../middlewares/admin.middleware';
const adminRouter: Router = express.Router();
const { signup, signin, getAllStudents, getAllEducators, eductorVrificatonInfo, verifyingEducator, logout } = require('../controllers/admin.controller');

adminRouter.post("/signup", signup);
adminRouter.post("/signin", signin);
adminRouter.get("/get-all-students", getAllStudents);
adminRouter.get("/get-all-educators", getAllEducators);
adminRouter.get("/get-educators", eductorVrificatonInfo);
adminRouter.post("/verify-educator/:id", verifyingEducator)
adminRouter.post("/logout", isAdminAuthenticated, logout)

module.exports = adminRouter;