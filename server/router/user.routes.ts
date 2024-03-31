import express, { Router } from 'express';
import { isUserAuthenticated } from '../middlewares/user.middleware';
const userRouter: Router = express.Router();
const { studentSignup, signin, educatorSignup, logout } = require('../controllers/user.controller');

userRouter.post("/educator-signup", educatorSignup);
userRouter.post("/student-signup", studentSignup);
userRouter.post("/signin", signin);
userRouter.post("/logout", isUserAuthenticated, logout);

module.exports = userRouter;