
import { motion } from "framer-motion";
import {
    Activity,
    ArrowDownRight,
    ArrowUpRight,
    HeartPulse,
    MapPin,
    ShieldCheck,
    Wind,
} from "lucide-react";

const AQI_CATEGORIES = [
    {
        max: 50,
        label: "Good",
        color: "#43e6a2",
        guidance: "Air quality is satisfactory, with little or no risk.",
        action: "Enjoy normal outdoor activities.",
    },
    {
        max: 100,
        label: "Satisfactory",
        color: "#a9e85c",
        guidance: "Air quality is acceptable for most people.",
        action: "Sensitive individuals should monitor symptoms.",
    },
    {
        max: 200,
        label: "Moderate",
        color: "#ffc857",
        guidance: "Some people may experience breathing discomfort.",
        action: "Reduce prolonged outdoor exertion if sensitive.",
    },
    {
        max: 300,
        label: "Poor",
        color: "#ff995b",
        guidance: "Prolonged exposure may affect more people.",
        action: "Limit prolonged outdoor physical activity.",
    },
    {
        max: 400,
        label: "Very Poor",
        color: "#ff6685",
        guidance: "Air pollution may cause respiratory discomfort.",
        action: "Avoid strenuous outdoor activity.",
    },
    {
        max: Infinity,
        label: "Severe",
        color: "#c69aff",
        guidance: "High pollution levels may pose serious health risks.",
        action: "Minimize outdoor exposure and follow local advisories.",
    },
];

function getAQICategory(value) {
    return AQI_CATEGORIES.find((category) => value <= category.max)
        || AQI_CATEGORIES[AQI_CATEGORIES.length - 1];
}

export default function AQIHero({ prediction, city }) {
    const hasPrediction =
        prediction &&
        Number.isFinite(Number(prediction.predicted_aqi));

    const rawAQI = hasPrediction
        ? Number(prediction.predicted_aqi)
        : 0;

    const aqi = Math.max(0, rawAQI);
    const displayAQI = Math.round(aqi);
    const category = hasPrediction ? getAQICategory(aqi) : null;

    // Display gauge scale: 0–500 AQI.
    const gaugeValue = Math.min(aqi, 500);
    const radius = 88;
    const circumference = 2 * Math.PI * radius;
    const progress = hasPrediction ? gaugeValue / 500 : 0;
    const dashOffset = circumference * (1 - progress);

    return (
        <motion.section
            className="aqi-hero-v2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            style={
                category
                    ? { "--aqi-accent": category.color }
                    : { "--aqi-accent": "#5de4df" }
            }
        >
            <div className="aqi-hero-v2-glow" />
            <div className="aqi-hero-v2-grid" />

            <div className="aqi-hero-v2-inner">
                <div className="aqi-hero-v2-main">
                    <div className="aqi-hero-v2-copy">
                        <div className="aqi-eyebrow">
                            <span className="aqi-live-dot" />
                            AI AIR QUALITY ANALYSIS
                        </div>

                        <h1>
                            Understand your air.
                            <br />
                            <span>Protect your tomorrow.</span>
                        </h1>

                        <p className="aqi-hero-v2-description">
                            Get an air quality estimate from pollutant
                            concentrations using your trained machine learning model.
                        </p>

                        <div className="aqi-hero-v2-city">
                            <span className="aqi-city-icon-v2">
                                <MapPin size={17} />
                            </span>

                            <div>
                                <span className="aqi-city-caption">Selected location</span>
                                <strong>{city || "Select a city"}</strong>
                            </div>
                        </div>

                        {hasPrediction && (
                            <motion.div
                                className="aqi-result-pill"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={`${displayAQI}-${category.label}`}
                            >
                                <span
                                    className="aqi-result-pill-dot"
                                    style={{ background: category.color }}
                                />
                                Prediction complete
                                <ShieldCheck size={16} />
                            </motion.div>
                        )}
                    </div>

                    <motion.div
                        className="aqi-gauge-v2-panel"
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.15, duration: 0.55 }}
                    >
                        <div className="aqi-gauge-v2-top">
                            <span>Predicted AQI</span>
                            <Activity size={17} />
                        </div>

                        <div className="aqi-gauge-v2">
                            <svg
                                viewBox="0 0 220 220"
                                className="aqi-gauge-v2-svg"
                                role="img"
                                aria-label={
                                    hasPrediction
                                        ? `Predicted AQI ${displayAQI}, ${category.label}`
                                        : "AQI prediction not available yet"
                                }
                            >
                                <defs>
                                    <linearGradient
                                        id="aqiGaugeGradient"
                                        x1="0%"
                                        y1="0%"
                                        x2="100%"
                                        y2="100%"
                                    >
                                        <stop
                                            offset="0%"
                                            stopColor={category?.color || "#5de4df"}
                                        />
                                        <stop
                                            offset="100%"
                                            stopColor="#6f8cff"
                                        />
                                    </linearGradient>
                                </defs>

                                <circle
                                    cx="110"
                                    cy="110"
                                    r={radius}
                                    fill="none"
                                    stroke="rgba(255,255,255,0.07)"
                                    strokeWidth="13"
                                />

                                <circle
                                    cx="110"
                                    cy="110"
                                    r={radius}
                                    fill="none"
                                    stroke="rgba(255,255,255,0.035)"
                                    strokeWidth="3"
                                />

                                <motion.circle
                                    cx="110"
                                    cy="110"
                                    r={radius}
                                    fill="none"
                                    stroke="url(#aqiGaugeGradient)"
                                    strokeWidth="13"
                                    strokeLinecap="round"
                                    strokeDasharray={circumference}
                                    initial={{ strokeDashoffset: circumference }}
                                    animate={{ strokeDashoffset: dashOffset }}
                                    transition={{
                                        duration: 1.4,
                                        ease: "easeOut",
                                    }}
                                    transform="rotate(-90 110 110)"
                                    style={{
                                        filter: "drop-shadow(0 0 8px var(--aqi-accent))",
                                    }}
                                />

                                <circle
                                    cx="110"
                                    cy="110"
                                    r="70"
                                    fill="rgba(8, 20, 35, 0.65)"
                                    stroke="rgba(255,255,255,0.055)"
                                />
                            </svg>

                            <div className="aqi-gauge-v2-center">
                                <span className="aqi-gauge-v2-label">
                                    {hasPrediction ? "AQI ESTIMATE" : "AWAITING DATA"}
                                </span>

                                <motion.strong
                                    key={hasPrediction ? displayAQI : "empty"}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.35 }}
                                >
                                    {hasPrediction ? displayAQI : "--"}
                                </motion.strong>

                                <span className="aqi-gauge-v2-scale">
                                    {hasPrediction ? "Scale: 0–500" : "Run a prediction"}
                                </span>
                            </div>
                        </div>

                        {hasPrediction ? (
                            <div
                                className="aqi-category-v2"
                                style={{
                                    color: category.color,
                                    background: `${category.color}14`,
                                    borderColor: `${category.color}45`,
                                }}
                            >
                                <span
                                    className="aqi-category-v2-dot"
                                    style={{ background: category.color }}
                                />
                                {category.label}
                            </div>
                        ) : (
                            <div className="aqi-category-v2 aqi-category-v2-empty">
                                <Wind size={15} />
                                No prediction yet
                            </div>
                        )}

                        <div className="aqi-gauge-v2-footer">
                            <span>Model output</span>
                            <strong>Random Forest</strong>
                        </div>
                    </motion.div>
                </div>

                <div className="aqi-health-panel">
                    <div className="aqi-health-icon">
                        <HeartPulse size={19} />
                    </div>

                    <div className="aqi-health-copy">
                        <span>
                            {hasPrediction ? "HEALTH INSIGHT" : "YOUR NEXT STEP"}
                        </span>
                        <strong>
                            {hasPrediction
                                ? category.guidance
                                : "Enter pollutant values to estimate air quality."}
                        </strong>
                        <p>
                            {hasPrediction
                                ? category.action
                                : "Your result will appear here after the model completes its prediction."}
                        </p>
                    </div>

                    {hasPrediction && (
                        <div className="aqi-health-trend">
                            {aqi <= 100 ? (
                                <ArrowDownRight size={20} />
                            ) : (
                                <ArrowUpRight size={20} />
                            )}
                            <span>{category.label}</span>
                        </div>
                    )}
                </div>

                <p className="aqi-hero-v2-disclaimer">
                    Model estimate based on supplied pollutant data. This is not a live
                    monitoring reading, a forecast, or a medical diagnosis.
                </p>
            </div>
        </motion.section>
    );
}
