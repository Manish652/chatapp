// axios.js or axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.MODE === "development" ? "http://localhost:3000/api" : "/api", // adjust this
  withCredentials: true, // THIS IS REQUIRED for cookies to be sent
});

// Add response interceptor to handle 401 errors silently
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only log non-401 errors
    if (error.response?.status !== 401) {
      console.error('Axios error:', error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
