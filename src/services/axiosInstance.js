import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; 



const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
});


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


const logoutUser = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");
    window.location.href = "/login"; 
};



const refreshTokenApi = async () => {
    const refresh_token = localStorage.getItem("refresh_token");
    try {
        const response = await axios.post(`${API_BASE_URL}/authentication/token/refresh/`, { refresh: refresh_token });
        localStorage.setItem("access_token", response.data.access);
        return response.data;
    } catch (error) {
        console.error("Failed to refresh token:", error);
        logoutUser();
    }
};

export default axiosInstance;
