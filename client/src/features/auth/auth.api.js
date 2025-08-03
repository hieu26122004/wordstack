import api from "@/services/api";
import axios from "axios";

const ROOT = "/auth";

const url = (path) => `${ROOT}/${path}`;

const URLS = {
  login: url("login"),
  register: url("register"),
  refreshToken: url("refresh-token"),
};

export const loginUser = async (email, password) => {
  const response = await api.post(URLS.login, { email, password });
  return response.data;
};

export const registerUser = async (username, email, password) => {
  const response = await api.post(URLS.register, {
    username,
    email,
    password,
  });
  return response.data;
};

export const refreshToken = async () => {
  try {
    const response = await axios.post(
      import.meta.env.DEV
        ? "http://localhost:8000/api/v1/auth/refresh-token"
        : "/api/v1/auth/refresh-token",
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log("refreshToken error", error);
    throw error;
  }
};
