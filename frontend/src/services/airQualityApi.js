const API_BASE_URL = (
    import.meta.env.VITE_API_URL ||
    import.meta.env.VITE_API_BASE_URL ||
    "http://127.0.0.1:8000"
).replace(/\/+$/, "");

export async function predictAirQuality(payload) {
    let response;

    try {
        response = await fetch(
            `${API_BASE_URL}/api/air-quality/predict`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(payload),
            }
        );
    } catch (error) {
        console.error("Backend connection error:", error);

        throw new Error(
            "Cannot connect to the backend. Check the backend URL and server status."
        );
    }

    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
        const detail = responseData.detail;

        const message = Array.isArray(detail)
            ? detail.map((item) => item.msg).join(", ")
            : typeof detail === "string"
                ? detail
                : `Prediction failed with HTTP ${response.status}.`;

        console.error("Prediction API error:", response.status, responseData);

        throw new Error(message);
    }

    return responseData;
}