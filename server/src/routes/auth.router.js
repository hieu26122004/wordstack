import express from "express";
import passport from "passport";
import * as authController from "../controllers/auth.controller.js";
import { loginValidator, registerValidator } from "../utils/validator.js";

const router = express.Router();

router
  .post("/register", registerValidator, authController.register)
  .post("/login", loginValidator, authController.login)
  .post("/refresh-token", authController.refreshToken)
  .get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  )
  .get("/oauth2/redirect/google", authController.loginWithGoogle);
//auth.loginWithGoogle

export default router;
