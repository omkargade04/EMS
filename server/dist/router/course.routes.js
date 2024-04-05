"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_middleware_1 = require("../middlewares/user.middleware");
const courseRouter = express_1.default.Router();
const { getACourse, get_a_course, updateTitle, updateDescription, updatePrice, addChapter, getAllChapters, getAllCourses } = require("../controllers/course.controller");
courseRouter.get("/get-all-courses", getAllCourses);
courseRouter.get("/get-all-chapters/:id", getAllChapters);
courseRouter.get("/get-a-course/:courseId", getACourse);
courseRouter.patch("/update-course/:id", user_middleware_1.isUserAuthenticated, updateTitle);
courseRouter.patch("/update-description-course/:id", user_middleware_1.isUserAuthenticated, updateDescription);
courseRouter.patch("/update-price-course/:id", user_middleware_1.isUserAuthenticated, updatePrice);
courseRouter.post("/create-chapters/:id", user_middleware_1.isUserAuthenticated, addChapter);
module.exports = courseRouter;
