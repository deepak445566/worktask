
import dotenv from "dotenv";
dotenv.config();


import express from "express";

import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";

import "./config/passport.js";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import contactRouter from "./routes/contactRoutes.js";



const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "https://task2-d8fi.vercel.app",
    credentials: true,
  }),
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server Running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
