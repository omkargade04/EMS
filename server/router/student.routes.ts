import express, { Router } from 'express';
import { isUserAuthenticated } from '../middlewares/user.middleware';
const studentRouter: Router = express.Router();
const { enrollForACourse, getMyCourses, courseCheckout, purchaseCourse, alreadyPurchased, logout } = require('../controllers/student.controller');


studentRouter.post("/enroll-for-course/:id", isUserAuthenticated, enrollForACourse);
studentRouter.get("/get-my-courses", isUserAuthenticated, getMyCourses);
studentRouter.get("/check-course/:id", isUserAuthenticated, alreadyPurchased);
studentRouter.post("/checkout/:id", isUserAuthenticated, courseCheckout);
studentRouter.post("/purchase-course/:id", isUserAuthenticated, purchaseCourse);
studentRouter.post("/logout", isUserAuthenticated, logout);

module.exports = studentRouter;