// utils/api.ts
import axios, { type AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  withCredentials: true,
});

// Interceptor: Handle 401 auto-refresh
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await api.post("/auth/refresh", {});
        return api(originalRequest);
      } catch (refreshError) {
        //console.log(refreshError);
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
