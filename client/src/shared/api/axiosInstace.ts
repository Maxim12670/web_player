import axios, { AxiosError } from "axios";

const BASE_URL = "http://localhost:3001/api/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const serverError = error.response.data as {
        statusCode: number;
        message: string;
        details?: Record<string, string>;
      };

      return Promise.reject(new Error(serverError.message || "Request failed"));
    }
    return Promise.reject(new Error("An unexpected error occurred"));
  }
);

export default axiosInstance;
