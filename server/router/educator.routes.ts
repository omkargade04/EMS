import express, { Router } from 'express';
import { isUserAuthenticated } from '../middlewares/user.middleware';
const educatorRouter: Router = express.Router();
const { createCourse,  educatorVerification, getMyCourses, educatorsCourses, logout } = require('../controllers/educator.controller');

educatorRouter.get("/get-my-courses", isUserAuthenticated, getMyCourses);
educatorRouter.post("/create-course", isUserAuthenticated, createCourse);
educatorRouter.post("/educator-verification", educatorVerification);
educatorRouter.post("/educator-courses", isUserAuthenticated, educatorsCourses);
educatorRouter.post("/logout", isUserAuthenticated, logout);

module.exports = educatorRouter;