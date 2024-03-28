import express, { Router } from 'express';
import { isStudentAuthenticated } from '../middlewares/user.middleware';
const studentRouter: Router = express.Router();
const { signup, signin, enrollForACourse, logout } = require('../controllers/student.controller');

studentRouter.post("/signup", signup);
studentRouter.post("/signin", signin);
studentRouter.post("/enroll-for-course/:id", isStudentAuthenticated, enrollForACourse);
studentRouter.post("/logout", isStudentAuthenticated, logout);

module.exports = studentRouter;