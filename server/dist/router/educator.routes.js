"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_middleware_1 = require("../middlewares/user.middleware");
const educatorRouter = express_1.default.Router();
const { createCourse, educatorVerification, getMyCourses, educatorsCourses, logout } = require('../controllers/educator.controller');
educatorRouter.get("/get-my-courses", user_middleware_1.isUserAuthenticated, getMyCourses);
educatorRouter.post("/create-course", user_middleware_1.isUserAuthenticated, createCourse);
educatorRouter.post("/educator-verification", educatorVerification);
educatorRouter.post("/educator-courses", user_middleware_1.isUserAuthenticated, educatorsCourses);
educatorRouter.post("/logout", user_middleware_1.isUserAuthenticated, logout);
module.exports = educatorRouter;
