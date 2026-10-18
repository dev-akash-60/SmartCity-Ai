import { motion } from "framer-motion";
import {
    Atom,
    Cloud,
    Droplets,
    FlaskConical,
    Gauge,
    Wind,
} from "lucide-react";

const pollutants = [
    {
        key: "PM2.5",
        label: "Fine Particles",
        unit: "µg/m³",
        icon: Wind,
        color: "#38e8d0",
    },
    {
        key: "PM10",
        label: "Coarse Particles",
        unit: "µg/m³",
        icon: Cloud,
        color: "#51a8ff",
    },
    {
        key: "NO",
        label: "Nitric Oxide",
        unit: "µg/m³",
        icon: Atom,
        color: "#a78bfa",
    },
    {
        key: "NO2",
        label: "Nitrogen Dioxide",
        unit: "µg/m³",
        icon: Atom,
        color: "#ff9c78",
    },
    {
        key: "NOx",
        label: "Nitrogen Oxides",
        unit: "µg/m³",
        icon: FlaskConical,
        color: "#ffc76a",
    },
    {
        key: "NH3",
        label: "Ammonia",
        unit: "µg/m³",
        icon: Droplets,
        color: "#75d7ff",
    },
    {
        key: "CO",
        label: "Carbon Monoxide",
        unit: "mg/m³",
        icon: Gauge,
        color: "#ff718c",
    },
    {
        key: "SO2",
        label: "Sulfur Dioxide",
        unit: "µg/m³",
        icon: Cloud,
        color: "#c7a0ff",
    },
    {
        key: "O3",
        label: "Ozone",
        unit: "µg/m³",
        icon: Wind,
        color: "#8be0a4",
    },
    {
        key: "Benzene",
        label: "Benzene",
        unit: "µg/m³",
        icon: FlaskConical,
        color: "#ffbd73",
    },
    {
        key: "Toluene",
        label: "Toluene",
        unit: "µg/m³",
        icon: Atom,
        color: "#e6a6ff",
    },
];

export default function PollutantGrid({ values = {} }) {
    const hasValues = pollutants.some(
        ({ key }) =>
            values[key] !== undefined &&
            values[key] !== null &&
            values[key] !== ""
    );

    return (
        <section className="pollutant-section">
            <div className="pollutant-section-heading">
                <div>
                    <span className="page-eyebrow">ATMOSPHERIC DATA</span>
                    <h2 className="section-title">Pollutant Overview</h2>
                    <p className="section-description">
                        Measurements supplied to the AQI prediction model.
                    </p>
                </div>

                <span className="pollutant-count">
                    {pollutants.length} PARAMETERS
                </span>
            </div>

            <div className="pollutant-grid">
                {pollutants.map((pollutant, index) => {
                    const Icon = pollutant.icon;
                    const rawValue = values[pollutant.key];

                    const hasValue =
                        rawValue !== undefined &&
                        rawValue !== null &&
                        rawValue !== "";

                    const numericValue = Number(rawValue);

                    return (
                        <motion.article
                            key={pollutant.key}
                            className="pollutant-card glass-panel glass-panel-interactive"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.35,
                                delay: Math.min(index * 0.035, 0.35),
                            }}
                        >
                            <div className="pollutant-card-top">
                                <span
                                    className="pollutant-icon"
                                    style={{
                                        color: pollutant.color,
                                        background: `${pollutant.color}14`,
                                        borderColor: `${pollutant.color}28`,
                                    }}
                                >
                                    <Icon size={19} strokeWidth={1.8} />
                                </span>

                                <span className="pollutant-key">
                                    {pollutant.key}
                                </span>
                            </div>

                            <div className="pollutant-card-value">
                                {hasValue && Number.isFinite(numericValue)
                                    ? numericValue.toLocaleString("en-IN", {
                                        maximumFractionDigits: 2,
                                    })
                                    : "--"}
                                <span>{pollutant.unit}</span>
                            </div>

                            <p className="pollutant-card-label">
                                {pollutant.label}
                            </p>

                            <div className="pollutant-card-footer">
                                <span
                                    className={`pollutant-data-dot ${hasValue ? "available" : ""
                                        }`}
                                />
                                {hasValue ? "Input available" : "Awaiting input"}
                            </div>
                        </motion.article>
                    );
                })}
            </div>

            {!hasValues && (
                <p className="pollutant-empty-note">
                    Pollutant values will appear here after you enter measurements.
                </p>
            )}
        </section>
    );
}