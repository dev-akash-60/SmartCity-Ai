import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000",
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
    },
});

export async function checkBackendHealth() {
    const response = await api.get("/api/health");
    return response.data;
}

export default api;