import { Navigate, Route, Routes } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./components/layout/DashboardLayout";
import AirQualityDashboard from "./pages/AirQualityDashboard";

import "./style/dashboard.css";
import "./style/air-quality.css";

export default function App() {
    return (
        <Routes>
            {/* Landing page */}
            <Route path="/" element={<LandingPage />} />

            {/* Dashboard and its pages */}
            <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route
                    path="air-quality"
                    element={<AirQualityDashboard />}
                />
            </Route>

            {/* Redirect unknown routes */}
            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />
        </Routes>
    );
}