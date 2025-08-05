import express from "express";
import * as wordController from "../controllers/word.controller.js";
import {
  createWordValidator,
  bulkCreateWordValidator,
} from "../utils/validator.js";
import { authenticate, cache } from "../middlewares/app.middleware.js";
import { getSearchWordKey } from "../utils/keys.js";

const router = express.Router();

router.post("/", authenticate, createWordValidator, wordController.createWord);

router.post(
  "/bulk-create",
  authenticate,
  bulkCreateWordValidator,
  wordController.bulkCreateWord
);

router.get(
  "/search",
  cache((req) => getSearchWordKey(req.originalUrl)),
  wordController.searchWords
);

export default router;
