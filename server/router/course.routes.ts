import express, { Router } from "express";
import { isUserAuthenticated } from '../middlewares/user.middleware';
const courseRouter: Router = express.Router();
const {
  getACourse,
  get_a_course,
  updateTitle,
  updateDescription,
  updatePrice,
  addChapter,
  getAllChapters,
  getAllCourses
} = require("../controllers/course.controller");

courseRouter.get("/get-all-courses", getAllCourses);
courseRouter.get("/get-all-chapters/:id", getAllChapters);
courseRouter.get("/get-a-course/:courseId", getACourse);
courseRouter.patch("/update-course/:id", isUserAuthenticated, updateTitle);
courseRouter.patch("/update-description-course/:id", isUserAuthenticated, updateDescription);
courseRouter.patch("/update-price-course/:id", isUserAuthenticated, updatePrice);
courseRouter.post("/create-chapters/:id", isUserAuthenticated, addChapter);

module.exports = courseRouter;
