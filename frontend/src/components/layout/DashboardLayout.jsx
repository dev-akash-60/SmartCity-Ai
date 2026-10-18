import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="dashboard-shell">
            {mobileOpen && (
                <button
                    type="button"
                    className="mobile-sidebar-backdrop"
                    aria-label="Close navigation"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            <div className={mobileOpen ? "mobile-sidebar-open" : ""}>
                <Sidebar
                    collapsed={collapsed}
                    onToggle={() => setCollapsed((previous) => !previous)}
                />
            </div>

            <div
                className={`dashboard-main ${collapsed ? "dashboard-main-expanded" : ""}`}
            >
                <Topbar onMenuClick={() => setMobileOpen((previous) => !previous)} />

                <div className="dashboard-content">
                    <Outlet />
                </div>

                <footer className="dashboard-footer">
                    <span>SmartCity AI</span>
                    <span>Urban intelligence and predictive analytics</span>
                </footer>
            </div>
        </div>
    );
}