import express, { Router } from 'express';
import { isUserAuthenticated } from '../middlewares/user.middleware';
const studentRouter: Router = express.Router();
const { enrollForACourse, logout } = require('../controllers/student.controller');

studentRouter.post("/enroll-for-course/:id", isUserAuthenticated, enrollForACourse);
studentRouter.post("/logout", isUserAuthenticated, logout);

module.exports = studentRouter;