import axios from "axios";

const API_BASE_URL = (
    import.meta.env.VITE_API_URL ||
    "http://127.0.0.1:8000"
).replace(/\/+$/, "");

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
    },
});

export async function checkBackendHealth() {
    const response = await api.get("/api/health");
    return response.data;
}

export default api;