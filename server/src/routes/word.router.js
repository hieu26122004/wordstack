import express from "express";
import * as wordController from "../controllers/word.controller.js";
import {
  createWordValidator,
  bulkCreateWordValidator,
} from "../utils/validator.js";
import { authenticate } from "../middlewares/app.middleware.js";

const router = express.Router();

router.post("/", authenticate, createWordValidator, wordController.createWord);

router.post(
  "/bulk-create",
  authenticate,
  bulkCreateWordValidator,
  wordController.bulkCreateWord
);

export default router;
