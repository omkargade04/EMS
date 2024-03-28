import express, { Router } from 'express';
import { isEducatorAuthenticated } from '../middlewares/user.middleware';
const educatorRouter: Router = express.Router();
const { signup, signin, createCourse, logout } = require('../controllers/educator.controller');

educatorRouter.post("/signup", signup);
educatorRouter.post("/signin", signin);
educatorRouter.post("/create-course", isEducatorAuthenticated, createCourse);
educatorRouter.post("/logout", isEducatorAuthenticated, logout);

module.exports = educatorRouter;