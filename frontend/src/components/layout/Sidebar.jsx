import { NavLink } from "react-router-dom";
import {
    Activity,
    LayoutDashboard,
    Wind,
    Gauge,
    Waves,
    Droplets,
    Recycle,
    ShieldAlert,
    ChevronLeft,
    ChevronRight,
    BrainCircuit,
} from "lucide-react";

const navigation = [
    { label: "Overview", path: "/dashboard", icon: LayoutDashboard },
    { label: "Air Quality", path: "/air-quality", icon: Wind },
    { label: "Traffic", path: "/traffic", icon: Gauge },
    { label: "Flood Prediction", path: "/flood-prediction", icon: Waves },
    { label: "Water Management", path: "/water-management", icon: Droplets },
    { label: "Waste Management", path: "/waste-management", icon: Recycle },
    { label: "City Risk Engine", path: "/city-risk", icon: ShieldAlert },
];

export default function Sidebar({ collapsed, onToggle }) {
    return (
        <aside className={`dashboard-sidebar ${collapsed ? "sidebar-collapsed" : ""}`}>
            <div className="sidebar-brand">
                <div className="sidebar-brand-icon">
                    <Activity size={23} />
                </div>

                {!collapsed && (
                    <div className="sidebar-brand-copy">
                        <strong>SmartCity AI</strong>
                        <span>INTELLIGENCE HUB</span>
                    </div>
                )}
            </div>

            <div className="sidebar-section-label">
                {!collapsed && "WORKSPACE"}
            </div>

            <nav className="sidebar-navigation">
                {navigation.map(({ label, path, icon: Icon }) => (
                    <NavLink
                        key={path}
                        to={path}
                        end={path === "/dashboard"}
                        title={collapsed ? label : undefined}
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "sidebar-link-active" : ""}`
                        }
                    >
                        <Icon size={19} strokeWidth={1.8} />
                        {!collapsed && <span>{label}</span>}
                        {!collapsed && path === "/dashboard" && (
                            <span className="sidebar-active-dot" />
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-bottom">
                <div className="sidebar-ai-card">
                    <div className="sidebar-ai-icon">
                        <BrainCircuit size={21} />
                    </div>

                    {!collapsed && (
                        <div>
                            <strong>AI Intelligence</strong>
                            <span>Model integration workspace</span>
                        </div>
                    )}
                </div>

                <button
                    type="button"
                    className="sidebar-collapse-button"
                    onClick={onToggle}
                    title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                    {!collapsed && <span>Collapse sidebar</span>}
                </button>
            </div>
        </aside>
    );
}