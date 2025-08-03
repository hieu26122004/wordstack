import { DB_NAME, DB_HOST, DB_PASS, DB_USER } from "./app.config.js";

export default {
  development: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    host: DB_HOST,
    dialect: "postgres",
    timezone: "+07:00",
    logging: false,
  },
  production: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    host: DB_HOST,
    dialect: "postgres",
    timezone: "+07:00",
    logging: false,
  },
  test: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    host: DB_HOST,
    dialect: "postgres",
    timezone: "+07:00",
  },
};
