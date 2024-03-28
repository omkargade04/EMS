import express, { Router } from 'express';
const courseRouter: Router = express.Router();
const { getAllCourses, getACourse } = require('../controllers/course.controller');

courseRouter.get("/get-all-courses", getAllCourses);
courseRouter.get("/get-a-course/:id", getACourse);

module.exports = courseRouter;