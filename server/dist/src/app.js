"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config({ path: "./config.env" });
const cors = require('cors');
const cron = require('node-cron');
const studentRoutes = require('../router/student.routes');
const educatorRoutes = require('../router/educator.routes');
const courseRoutes = require('../router/course.routes');
const adminRoutes = require('../router/admin.routes');
const userRoutes = require('../router/user.routes');
const app = (0, express_1.default)();
app.use(express_1.default.json());
const corsOptions = {
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/v1/user', userRoutes);
app.use('/v1/student', studentRoutes);
app.use('/v1/educator', educatorRoutes);
app.use("/v1/course", courseRoutes);
app.use('/v1/admin', adminRoutes);
const port = process.env.PORT;
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("first");
        res.send("Hello");
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}));
app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
});
// Added cron
app.get("/ping", (req, res) => {
    res.status(200).json("pong....");
});
const API_ENDPOINT = "https://community-backend-5z55.onrender.com";
const makeApiRequest = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(API_ENDPOINT);
        return response.data;
    }
    catch (err) {
        console.error("API request failed:", err.message);
        throw err;
    }
});
const runApiRequestJob = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Running API request job...");
    try {
        const responseData = yield makeApiRequest();
        return responseData;
    }
    catch (error) {
        return null;
    }
});
// Schedule the API request job to run every 15 minutes
cron.schedule("*/15 * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    const responseData = yield runApiRequestJob();
    if (responseData) {
        // Process the response data here
        console.log("API request successful:", responseData);
    }
    else {
        console.log("API request failed");
    }
}));
