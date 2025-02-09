import base_url from "./base_url";
import axios from "axios";

const logoutUser = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");
    window.location.href = "/login"; 
};

export const loginApi = async (data) => {
    try {
        const response = await axios.post(`${base_url}/authentication/login/`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        localStorage.setItem("username", response.data.username);

        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : "Something went wrong";
    }
};


export const logoutApi = async () => {
    try {
        await axios.post(`${base_url}/authentication/logout/`);
        logoutUser(); 
    } catch (error) {
        throw error.response ? error.response.data : "Something went wrong";
    }
};


export const refreshToken = async () => {
    const refresh_token = localStorage.getItem("refresh_token");
    if (!refresh_token) return;
    try {
        const response = await axios.post("http://127.0.0.1:8000/authentication/token/refresh/", { refresh: refresh_token });
        localStorage.setItem("token", response.data.access);
    } catch (error) {
        console.error("Refresh Token Error:", error);
        localStorage.removeItem("token");
    }
};


export const registrationApi = async (userData) => {
    try {
        const response = await fetch("http://127.0.0.1:8000/authentication/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Registration failed");
        }

        const data = await response.json();
        console.log("Registration successful:", data);
        return { status: response.status, data }; 
    } catch (error) {
        console.error("Error:", error);
        throw error; 
    }
};


export const requestResetEmailApi = async (email) => {
    try {
        const response = await axios.post(`${base_url}/authentication/request-reset-email/`, { email });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : "Something went wrong";
    }
};

export const completePasswordResetApi = async (uidb64, token, password, password2) => {
    try {
        const response = await axios.post(`${base_url}/authentication/reset-password/${uidb64}/${token}/`, { password, password2 });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : "Something went wrong";
    }
};

export const fetchCategories = async () => {
    try {
        const response = await axiosInstance.get(`/expense/categories/`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : "Something went wrong";
    }
};

export const addExpense = async (data) => {
    try {
        const response = await axiosInstance.post(`/expense/expenses/`, data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : "Something went wrong";
    }
};
