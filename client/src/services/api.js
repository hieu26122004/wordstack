import { refreshToken } from "@/features/auth/auth.api";
import { logout, updateAccessToken } from "@/features/auth/auth.slice";
import store from "@/store";
import axios from "axios";

const defaultParams = {
  baseURL: import.meta.env.DEV ? "http://localhost:8000/api/v1" : "",
  withCredentials: true,
};

const axiosInstance = axios.create(defaultParams);

let isRefreshing = false;

let queue = [];

const processQueue = (error = null, token = null) => {
  queue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  queue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((error) => {
            return Promise.reject(error);
          });
      }

      isRefreshing = true;
      try {
        const { data } = await refreshToken();
        store.dispatch(updateAccessToken(data));
        originalRequest.headers.Authorization = `Bearer ${data}`;
        processQueue(null, data);
        return axios(originalRequest).catch((err) =>
          Promise.reject(
            err?.response?.data?.message || "An unknown error occurred"
          )
        );
      } catch (err) {
        processQueue(err, null);
        store.dispatch(logout());
        window.location.href = "/login";
        return Promise.reject(
          err?.response?.data?.message || "An unknown error occurred"
        );
      }
    }

    return Promise.reject(
      error?.response?.data?.message || "An unknown error occurred"
    );
  }
);

axiosInstance.interceptors.request.use(
  (request) => {
    const { accessToken } = store.getState().auth;
    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);

const api = (axios) => {
  return {
    get: (url, config) => axios.get(url, config),
    post: (url, data, config) => axios.post(url, data, config),
    put: (url, data, config) => axios.put(url, data, config),
    patch: (url, data, config) => axios.patch(url, data, config),
    delete: (url, config) => axios.delete(url, config),
  };
};

export default api(axiosInstance);
