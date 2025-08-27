import axios from "axios";
import { installLoadingPlugin } from "./loadingAxiosPlugin";

// Base URL for your API
const BASE_URL =
  import.meta.env.REACT_APP_API_URL ||
  "http://edu-madarsa-board.bihar.gov.in/api/v1/";

// Create axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage or Redux store
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request in development
    if (process.env.NODE_ENV === "development") {
      console.log("🚀 API Request:", {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
      });
    }

    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Log response in development
    if (process.env.NODE_ENV === "development") {
      console.log("✅ API Response:", {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }

    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem("authToken");
          window.location.href = "/login";
          break;
        case 403:
          console.error(
            "❌ Forbidden: You do not have permission to access this resource"
          );
          break;
        case 404:
          console.error("❌ Not Found: The requested resource was not found");
          break;
        case 500:
          console.error("❌ Server Error: Internal server error occurred");
          break;
        default:
          console.error(
            `❌ API Error (${status}):`,
            data?.message || error.message
          );
      }
    } else if (error.request) {
      console.error("❌ Network Error: No response received from server");
    } else {
      console.error("❌ Request Setup Error:", error.message);
    }

    return Promise.reject(error);
  }
);

// Install loading plugin once
installLoadingPlugin(apiClient);

export default apiClient;
