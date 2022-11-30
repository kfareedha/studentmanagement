import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";

import session from "express-session";

import cors from "cors";
const port = process.env.PORT || 5000;
import AuthRoute from "./routes/authRoutes.js";
import StudentRoute from "./routes/studentRoutes.js";
const app = express();
app.use(express.static("public"));
app.use("/images", express.static("images"));
//Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
dotenv.config();
app.use(
  session({
    secret: "key",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 6000000 },
  })
);

//Routes
import connectDB from "./config/connect.js";
app.use("/auth", AuthRoute);
app.use("/student", StudentRoute);
app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
