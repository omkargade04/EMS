"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_middleware_1 = require("../middlewares/user.middleware");
const userRouter = express_1.default.Router();
const { studentSignup, signin, educatorSignup, logout } = require('../controllers/user.controller');
userRouter.post("/educator-signup", educatorSignup);
userRouter.post("/student-signup", studentSignup);
userRouter.post("/signin", signin);
userRouter.post("/logout", user_middleware_1.isUserAuthenticated, logout);
module.exports = userRouter;
