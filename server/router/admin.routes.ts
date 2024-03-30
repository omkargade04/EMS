import express, { Router } from 'express';
import { isAdminAuthenticated } from '../middlewares/admin.middleware';
const adminRouter: Router = express.Router();
const { signup, signin, eductorVrificatonInfo, verifyingEducator } = require('../controllers/admin.controller');

adminRouter.post("/signup", signup);
adminRouter.post("/signin", signin);
adminRouter.get("/get-educators", eductorVrificatonInfo);
adminRouter.post("/verify-educator/:id", verifyingEducator)

module.exports = adminRouter;