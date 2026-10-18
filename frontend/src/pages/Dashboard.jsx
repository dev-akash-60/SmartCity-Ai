
import {
    Activity,
    BrainCircuit,
    Droplets,
    Gauge,
    Leaf,
    ShieldAlert,
    Waves,
    Wind,
    ArrowUpRight,
    ChartNoAxesCombined,
    Sparkles,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import MetricCard from "../components/cards/MetricCard";
import CityTrendChart from "../components/charts/CityTrendChart";

const modules = [
    {
        title: "Air Quality",
        description: "Analyze air pollution patterns and air quality indicators.",
        icon: Wind,
        color: "#58c7ff",
        path: "/air-quality",
        status: "Available",
    },
    {
        title: "Traffic Intelligence",
        description: "Explore traffic flow and congestion prediction.",
        icon: Gauge,
        color: "#a99aff",
        path: "/traffic",
        status: "In development",
    },
    {
        title: "Flood Prediction",
        description: "Assess potential flood conditions and risk factors.",
        icon: Waves,
        color: "#50d9c1",
        path: "/flood-prediction",
        status: "In development",
    },
    {
        title: "Water Management",
        description: "Monitor water resources and management indicators.",
        icon: Droplets,
        color: "#5da5ff",
        path: "/water-management",
        status: "In development",
    },
    {
        title: "Waste Management",
        description: "Explore waste collection and planning strategies.",
        icon: Leaf,
        color: "#a4e28a",
        path: "/waste-management",
        status: "In development",
    },
    {
        title: "City Risk Engine",
        description: "Bring urban risk indicators together in one workspace.",
        icon: ShieldAlert,
        color: "#ffb779",
        path: "/city-risk",
        status: "In development",
    },
];

const sampleTrend = [
    { label: "Mon", value: 38 },
    { label: "Tue", value: 44 },
    { label: "Wed", value: 35 },
    { label: "Thu", value: 52 },
    { label: "Fri", value: 43 },
    { label: "Sat", value: 34 },
    { label: "Sun", value: 41 },
];

const sectionVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: "easeOut" },
    },
};

export default function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="overview-page">

            {/* PAGE HEADER */}
            <motion.header
                className="overview-welcome"
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
            >
                <div className="overview-welcome-copy">
                    <div className="eyebrow">
                        <span className="status-dot" />
                        SMART CITY INTELLIGENCE
                    </div>

                    <h1>
                        City <span className="gradient-text">Overview</span>
                    </h1>

                    <p>
                        One workspace to explore urban systems, predictive
                        models, and citywide risk indicators.
                    </p>
                </div>

                <div className="overview-ai-badge">
                    <div className="overview-ai-badge-icon">
                        <BrainCircuit size={22} />
                    </div>
                    <div>
                        <strong>AI Workspace</strong>
                        <span>Integration in progress</span>
                    </div>
                    <Sparkles
                        size={16}
                        className="overview-ai-sparkle"
                    />
                </div>
            </motion.header>

            {/* PLATFORM METRICS */}
            <motion.section
                className="overview-section"
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                transition={{ delay: 0.08 }}
            >
                <div className="overview-section-heading">
                    <div>
                        <span className="section-kicker">AT A GLANCE</span>
                        <h2>Platform Overview</h2>
                        <p>A snapshot of your current platform setup.</p>
                    </div>
                </div>

                <div className="metric-grid">
                    <MetricCard
                        title="AI Modules"
                        value="6"
                        subtitle="Planned prediction systems"
                        icon={BrainCircuit}
                        color="#40e0d0"
                    />

                    <MetricCard
                        title="Predictions"
                        value="—"
                        subtitle="No recorded predictions"
                        icon={Activity}
                        color="#58c7ff"
                    />

                    <MetricCard
                        title="Active Alerts"
                        value="—"
                        subtitle="Alert engine not configured"
                        icon={ShieldAlert}
                        color="#ffb779"
                    />

                    <MetricCard
                        title="Sustainability"
                        value="—"
                        subtitle="Awaiting validated data"
                        icon={Leaf}
                        color="#a4e28a"
                    />
                </div>
            </motion.section>

            {/* MODULE DIRECTORY */}
            <motion.section
                className="overview-section"
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                transition={{ delay: 0.14 }}
            >
                <div className="overview-section-heading module-heading">
                    <div>
                        <span className="section-kicker">YOUR WORKSPACE</span>
                        <h2>Intelligence Modules</h2>
                        <p>
                            Explore the six systems addressing major urban
                            challenges.
                        </p>
                    </div>

                    <div className="module-count">
                        <ChartNoAxesCombined size={16} />
                        <span>06 modules</span>
                    </div>
                </div>

                <div className="module-grid">
                    {modules.map(
                        ({ title, description, icon: Icon, color, path, status }, index) => {
                            const isAvailable = status === "Available";

                            return (
                                <motion.article
                                    key={path}
                                    className={`module-card ${isAvailable ? "module-card-active" : ""
                                        }`}
                                    style={{ "--module-color": color }}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.35,
                                        delay: 0.04 * index,
                                    }}
                                >
                                    <div className="module-card-top">
                                        <div className="module-card-icon">
                                            <Icon size={21} strokeWidth={1.8} />
                                        </div>

                                        <span
                                            className={`module-status ${isAvailable
                                                    ? "module-status-available"
                                                    : ""
                                                }`}
                                        >
                                            <span />
                                            {status}
                                        </span>
                                    </div>

                                    <div className="module-card-copy">
                                        <h3>{title}</h3>
                                        <p>{description}</p>
                                    </div>

                                    <button
                                        type="button"
                                        className="module-open-button"
                                        onClick={() => navigate(path)}
                                        disabled={!isAvailable}
                                    >
                                        <span>
                                            {isAvailable
                                                ? "Open workspace"
                                                : "Coming soon"}
                                        </span>
                                        {isAvailable && (
                                            <ArrowUpRight size={17} />
                                        )}
                                    </button>
                                </motion.article>
                            );
                        }
                    )}
                </div>
            </motion.section>

            {/* TREND SECTION */}
            <motion.section
                className="overview-section trend-section"
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                transition={{ delay: 0.2 }}
            >
                <div className="overview-section-heading">
                    <div>
                        <span className="section-kicker">DATA EXPLORER</span>
                        <h2>Weekly Trend Preview</h2>
                        <p>
                            Example trend visualization for the dashboard layout.
                        </p>
                    </div>
                </div>

                <div className="trend-chart-container">
                    <CityTrendChart
                        data={sampleTrend}
                        title="Weekly Trend Preview"
                    />
                </div>

                <p className="trend-disclaimer">
                    Preview data only. Replace with actual model outputs
                    before using this chart for city monitoring.
                </p>
            </motion.section>

        </div>
    );
}
