import express, { Request, Response, Application, urlencoded } from "express";
import axios from "axios";
require("dotenv").config();
const cors = require("cors");
const cron = require("node-cron");
const studentRoutes = require("../router/student.routes");
const educatorRoutes = require("../router/educator.routes");
const courseRoutes = require("../router/course.routes");
const adminRoutes = require("../router/admin.routes");
const userRoutes = require("../router/user.routes");

const app: Application = express();
app.use(express.json());
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://ems-1aknn10h1-omkar-gades-projects.vercel.app",
    "https://ems-one-gilt.vercel.app",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

app.use("/v1/user", userRoutes);
app.use("/v1/student", studentRoutes);
app.use("/v1/educator", educatorRoutes);
app.use("/v1/course", courseRoutes);
app.use("/v1/admin", adminRoutes);

const port = process.env.PORT;

app.get("/", async (req: Request, res: Response) => {
  try {
    console.log("first");
    res.send("Hello");
  } catch (err: any) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, (): void => {
  console.log(`server is running at http://localhost:${port}`);
});

// Added cron

app.get("/ping", (req, res) => {
  res.status(200).json("pong....");
});

const API_ENDPOINT = "https://ems-q9s0.onrender.com";

const makeApiRequest = async () => {
  try {
    const response = await axios.get(API_ENDPOINT);
    return response.data;
  } catch (err: any) {
    console.error("API request failed:", err.message);
    throw err;
  }
};

const runApiRequestJob = async () => {
  console.log("Running API request job...");
  try {
    const responseData = await makeApiRequest();
    return responseData;
  } catch (error) {
    return null;
  }
};

// Schedule the API request job to run every 15 minutes
cron.schedule("*/15 * * * *", async () => {
  const responseData = await runApiRequestJob();
  if (responseData) {
    // Process the response data here
    console.log("API request successful:", responseData);
  } else {
    console.log("API request failed");
  }
});
