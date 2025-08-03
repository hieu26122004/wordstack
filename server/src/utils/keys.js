import { APP_NAME } from "../config/app.config.js";

export const getRTKey = (rt) => `${APP_NAME}:refresh-tokens:${rt}`;
