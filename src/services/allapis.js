

import base_url from "./base_url";
import axios from "axios";

// ✅ Create an Axios instance with default configurations
const axiosInstance = axios.create({
    baseURL: base_url,
    headers: {
        "Content-Type": "application/json",
    },
});

// ✅ Interceptor to attach access token automatically
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ✅ Interceptor to handle token expiration and refresh token
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await refreshTokenApi();
                originalRequest.headers.Authorization = `Bearer ${localStorage.getItem("access_token")}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                logoutUser();
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;

// ✅ Function to handle logout and clear storage
const logoutUser = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");
    window.location.href = "/login"; // Redirect to login page
};

// ✅ Login API
export const loginApi = async (data) => {
    try {
        const response = await axios.post(`${base_url}/authentication/login/`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Store access and refresh tokens securely
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        localStorage.setItem("username", response.data.username);

        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : "Something went wrong";
    }
};

// ✅ Logout API
export const logoutApi = async () => {
    try {
        await axios.post(`${base_url}/authentication/logout/`);
        logoutUser(); // Clear storage & redirect
    } catch (error) {
        throw error.response ? error.response.data : "Something went wrong";
    }
};

// ✅ Token Refresh API
export const refreshTokenApi = async () => {
    try {
        const refresh_token = localStorage.getItem("refresh_token");
        const response = await axios.post(`${base_url}/authentication/token/refresh/`, { refresh: refresh_token });

        localStorage.setItem("access_token", response.data.access);
        return response.data;
    } catch (error) {
        console.error("Failed to refresh token:", error);
        logoutUser();
    }
};

// ✅ Registration API
export const registrationApi = async (data) => {
    return await axios.post(`${base_url}/authentication/register/`, data);
};

// ✅ Request Password Reset Email
export const requestResetEmailApi = async (email) => {
    try {
        const response = await axios.post(`${base_url}/authentication/request-reset-email/`, { email });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : "Something went wrong";
    }
};

// ✅ Complete Password Reset
export const completePasswordResetApi = async (uidb64, token, password, password2) => {
    try {
        const response = await axios.post(`${base_url}/authentication/reset-password/${uidb64}/${token}/`, { password, password2 });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : "Something went wrong";
    }
};

// ✅ Fetch Categories with Authentication
export const fetchCategories = async () => {
    try {
        const response = await axiosInstance.get(`/expense/categories/`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : "Something went wrong";
    }
};

// ✅ Add New Expense
export const addExpense = async (data) => {
    try {
        const response = await axiosInstance.post(`/expense/expenses/`, data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : "Something went wrong";
    }
};
