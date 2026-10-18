
import { useState } from "react";
import { motion } from "framer-motion";
import {
    Activity,
    ArrowDownRight,
    ArrowUpRight,
    CloudSun,
    Cpu,
    RefreshCw,
    ShieldCheck,
    Wind,
} from "lucide-react";

import AQIHero from "../components/air-quality/AQIHero";
import PollutantGrid from "../components/air-quality/PollutantGrid";
import PredictionForm from "../components/air-quality/PredictionForm";
import { predictAirQuality } from "../services/airQualityApi";

const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
};

export default function AirQualityDashboard() {
    const [prediction, setPrediction] = useState(null);
    const [pollutants, setPollutants] = useState({});
    const [city, setCity] = useState("Delhi");
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    async function handlePredict(payload) {
        setLoading(true);
        setApiError("");

        try {
            const result = await predictAirQuality(payload);

            setPrediction(result);
            setPollutants({
                "PM2.5": payload["PM2.5"],
                PM10: payload.PM10,
                NO: payload.NO,
                NO2: payload.NO2,
                NOx: payload.NOx,
                NH3: payload.NH3,
                CO: payload.CO,
                SO2: payload.SO2,
                O3: payload.O3,
                Benzene: payload.Benzene,
                Toluene: payload.Toluene,
            });
            setCity(payload.City);
        } catch (error) {
            setApiError(error.message || "Unable to generate a prediction.");
            throw error;
        } finally {
            setLoading(false);
        }
    }

    function resetDashboard() {
        setPrediction(null);
        setPollutants({});
        setApiError("");
        setCity("Delhi");
    }

    return (
        <main className="air-dashboard page-content">
            <div className="air-dashboard-orb air-dashboard-orb-one" />
            <div className="air-dashboard-orb air-dashboard-orb-two" />

            <motion.header
                className="air-dashboard-header"
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ duration: 0.55 }}
            >
                <div className="air-brand">
                    <div className="air-brand-icon">
                        <Wind size={23} />
                    </div>

                    <div>
                        <p className="air-brand-name">ATMOS<span>AI</span></p>
                        <p className="air-brand-caption">SMART CITY INTELLIGENCE</p>
                    </div>
                </div>

                <div className="air-header-status">
                    <span className="status-dot" />
                    <span>AI MODEL READY</span>
                    <span className="air-header-divider" />
                    <span className="air-header-model">Random Forest</span>
                </div>
            </motion.header>

            <motion.section
                className="air-welcome"
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ duration: 0.55, delay: 0.08 }}
            >
                <div>
                    <p className="page-eyebrow">
                        <span className="air-eyebrow-line" />
                        ENVIRONMENTAL INTELLIGENCE / 01
                    </p>

                    <h1 className="page-title">
                        Air quality, <span className="accent-text">decoded.</span>
                    </h1>

                    <p className="page-description air-welcome-description">
                        Analyze pollutant concentrations and estimate the Air Quality
                        Index using your trained machine learning model.
                    </p>
                </div>

                <button
                    type="button"
                    className="secondary-button air-reset-button"
                    onClick={resetDashboard}
                >
                    <RefreshCw size={15} />
                    Reset results
                </button>
            </motion.section>

            <motion.section
                className="air-summary-strip"
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ duration: 0.5, delay: 0.15 }}
            >
                <div className="air-summary-item">
                    <div className="air-summary-icon cyan">
                        <Cpu size={19} />
                    </div>
                    <div>
                        <span className="air-summary-label">PREDICTION ENGINE</span>
                        <strong>Random Forest</strong>
                    </div>
                </div>

                <div className="air-summary-item">
                    <div className="air-summary-icon purple">
                        <Activity size={19} />
                    </div>
                    <div>
                        <span className="air-summary-label">INPUT PARAMETERS</span>
                        <strong>11 pollutants</strong>
                    </div>
                </div>

                <div className="air-summary-item">
                    <div className="air-summary-icon green">
                        <ShieldCheck size={19} />
                    </div>
                    <div>
                        <span className="air-summary-label">MODEL STATUS</span>
                        <strong>{loading ? "Processing..." : "Ready to predict"}</strong>
                    </div>
                </div>
            </motion.section>

            {apiError && (
                <motion.div
                    className="air-api-error"
                    role="alert"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Activity size={18} />
                    <div>
                        <strong>Prediction unsuccessful</strong>
                        <p>{apiError}</p>
                    </div>
                </motion.div>
            )}

            <div className="air-dashboard-grid">
                <motion.div
                    className="air-dashboard-main"
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    transition={{ duration: 0.55, delay: 0.2 }}
                >
                    <AQIHero prediction={prediction} city={city} />

                    <section className="glass-panel air-result-panel">
                        <div className="air-result-heading">
                            <div className="air-section-icon">
                                <CloudSun size={19} />
                            </div>
                            <div>
                                <h2 className="section-title">Prediction overview</h2>
                                <p className="section-description">
                                    {prediction
                                        ? `Model output for ${city}`
                                        : "Your model results will appear here"}
                                </p>
                            </div>
                        </div>

                        {prediction ? (
                            <div className="air-result-details">
                                <div className="air-result-detail">
                                    <span>Predicted AQI</span>
                                    <strong>
                                        {Number(prediction.predicted_aqi).toLocaleString(
                                            "en-IN",
                                            { maximumFractionDigits: 2 }
                                        )}
                                    </strong>
                                </div>

                                <div className="air-result-detail">
                                    <span>Air quality category</span>
                                    <strong>{prediction.category || "Not provided"}</strong>
                                </div>

                                <div className="air-result-detail">
                                    <span>Model used</span>
                                    <strong>{prediction.model || "Trained model"}</strong>
                                </div>
                            </div>
                        ) : (
                            <div className="air-empty-result">
                                <div className="air-empty-result-icon">
                                    <Activity size={24} />
                                </div>
                                <p>Awaiting your first prediction</p>
                                <span>
                                    Enter pollutant measurements and run the model to see results.
                                </span>
                            </div>
                        )}
                    </section>

                    <PollutantGrid values={pollutants} />
                </motion.div>

                <motion.aside
                    className="air-dashboard-sidebar"
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    transition={{ duration: 0.55, delay: 0.28 }}
                >
                    <PredictionForm
                        onPredict={handlePredict}
                        loading={loading}
                    />

                    <section className="glass-panel air-method-panel">
                        <div className="air-method-top">
                            <div className="air-method-icon">
                                <Cpu size={18} />
                            </div>
                            <span className="air-method-tag">ML PIPELINE</span>
                        </div>

                        <h3>Inside the model</h3>
                        <p>
                            Your trained Random Forest pipeline processes the supplied
                            pollutant data and estimates an AQI value.
                        </p>

                        <div className="air-method-steps">
                            <div className="air-method-step">
                                <span className="air-step-number">01</span>
                                <span>Input pollutant data</span>
                                <ArrowDownRight size={15} />
                            </div>
                            <div className="air-method-step">
                                <span className="air-step-number">02</span>
                                <span>Feature preprocessing</span>
                                <ArrowDownRight size={15} />
                            </div>
                            <div className="air-method-step">
                                <span className="air-step-number">03</span>
                                <span>AQI estimation</span>
                                <ArrowUpRight size={15} />
                            </div>
                        </div>
                    </section>
                </motion.aside>
            </div>

            <footer className="air-dashboard-footer">
                <span>ATMOSAI <span className="air-footer-dot">●</span> AIR QUALITY INTELLIGENCE</span>
                <span>Estimates depend on the supplied input data.</span>
            </footer>
        </main>
    );
}
