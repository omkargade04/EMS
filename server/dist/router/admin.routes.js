"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_middleware_1 = require("../middlewares/admin.middleware");
const adminRouter = express_1.default.Router();
const { signup, signin, getAllStudents, getAllEducators, eductorVrificatonInfo, verifyingEducator, logout } = require('../controllers/admin.controller');
adminRouter.post("/signup", signup);
adminRouter.post("/signin", signin);
adminRouter.get("/get-all-students", getAllStudents);
adminRouter.get("/get-all-educators", getAllEducators);
adminRouter.get("/get-educators", eductorVrificatonInfo);
adminRouter.post("/verify-educator/:id", verifyingEducator);
adminRouter.post("/logout", admin_middleware_1.isAdminAuthenticated, logout);
module.exports = adminRouter;
