//*todo: implement taskService and call the API
import axios from "axios";
import { authService } from "./authService";

const API_URL = "http://localhost:9090/api/tasks";

// Create axios instance with JWT token
const api = axios.create({
    baseURL: API_URL,
});

// Add interceptor to include token in every request
api.interceptors.request.use((config) => {
    const token = authService.getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const taskService = {
    getAllTasks: async () => {
        const response = await api.get("/");
        return response.data;
    },

    createTask: async (task) => {
        const response = await api.post("/", task);
        return response.data;
    },

    deleteTask: async (id) => {
        await api.delete(`/${id}`);
    },

    updateTaskStatus: async (id, status) => {
        const response = await api.put(`/${id}/status`, { status });
        return response.data;
    }
};