import express, { Router } from 'express';
import { isAdminAuthenticated } from '../middlewares/admin.middleware';
const adminRouter: Router = express.Router();
const { signup, signin } = require('../controllers/admin.controller');

adminRouter.post("/signup", signup);
adminRouter.post("/signin", signin);

module.exports = adminRouter;