import express, { Router } from 'express';
import { isUserAuthenticated } from '../middlewares/user.middleware';
const educatorRouter: Router = express.Router();
const { createCourse, educatorVerification, logout } = require('../controllers/educator.controller');


educatorRouter.post("/create-course", isUserAuthenticated, createCourse);
educatorRouter.post("/educator-verification", educatorVerification);
educatorRouter.post("/logout", isUserAuthenticated, logout);

module.exports = educatorRouter;