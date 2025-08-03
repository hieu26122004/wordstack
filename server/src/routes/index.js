import express from "express";
import authRouter from "./auth.router.js";
import wordRouter from "./word.router.js";

const router = express.Router();

const routers = [
  { prefix: "/auth", handler: authRouter },
  { prefix: "/word", handler: wordRouter },
];

routers.forEach((r) => router.use(r.prefix, r.handler));

export default router;
