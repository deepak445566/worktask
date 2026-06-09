import express from "express";
import passport from "passport";
import { getProfile, googleAuthSuccess, login, logout, register } from "../controllers/authControllers.js";
import { protect } from "../middleware/authmiddleware.js";

const authRouter = express.Router();
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/me", protect, getProfile);
authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://worktask-jade.vercel.app/login",
    session: true,
  }),
  googleAuthSuccess,
);

export default authRouter;
