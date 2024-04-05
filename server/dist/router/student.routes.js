"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_middleware_1 = require("../middlewares/user.middleware");
const studentRouter = express_1.default.Router();
const { enrollForACourse, getMyCourses, courseCheckout, purchaseCourse, alreadyPurchased, logout } = require('../controllers/student.controller');
studentRouter.post("/enroll-for-course/:id", user_middleware_1.isUserAuthenticated, enrollForACourse);
studentRouter.get("/get-my-courses", user_middleware_1.isUserAuthenticated, getMyCourses);
studentRouter.get("/check-course/:id", user_middleware_1.isUserAuthenticated, alreadyPurchased);
studentRouter.post("/checkout/:id", user_middleware_1.isUserAuthenticated, courseCheckout);
studentRouter.post("/purchase-course/:id", user_middleware_1.isUserAuthenticated, purchaseCourse);
studentRouter.post("/logout", user_middleware_1.isUserAuthenticated, logout);
module.exports = studentRouter;
