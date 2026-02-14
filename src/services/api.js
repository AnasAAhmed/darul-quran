import axios from "axios";
import { serverUrl } from "../redux/store";

import { errorMessage } from "../lib/toast.config";

const axiosInstance = axios.create({
    baseURL: `${serverUrl}/api`, // append /api here
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // If you need to send cookies
});

// Request Interceptor: Attach Token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor: Handle Errors Globally
axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const message = error.response?.data?.message || "An error occurred";
        errorMessage(message);
        return Promise.reject(error);
    }
);

export const api = {
    get: (endpoint, config = {}) => axiosInstance.get(endpoint, config),

    post: (endpoint, data, config = {}) => axiosInstance.post(endpoint, data, config),

    put: (endpoint, data, config = {}) => axiosInstance.put(endpoint, data, config),

    delete: (endpoint, config = {}) => axiosInstance.delete(endpoint, config),

    // File Upload Helper (Let Axios determine Content-Type)
    upload: (endpoint, formData, config = {}) => {
        return axiosInstance.post(endpoint, formData, {
            ...config,
            headers: { ...config.headers, "Content-Type": "multipart/form-data" },
        });
    },
};

export default axiosInstance;
