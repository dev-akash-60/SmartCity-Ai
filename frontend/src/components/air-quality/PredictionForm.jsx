
import { useState } from "react";
import { motion } from "framer-motion";
import {
    Activity,
    CalendarDays,
    Check,
    ChevronDown,
    RotateCcw,
    Sparkles,
    Wind,
} from "lucide-react";

const POLLUTANTS = [
    {
        key: "PM2.5",
        label: "PM2.5",
        unit: "µg/m³",
        description: "Fine particulate matter",
        group: "Particulate matter",
    },
    {
        key: "PM10",
        label: "PM10",
        unit: "µg/m³",
        description: "Coarse particulate matter",
        group: "Particulate matter",
    },
    {
        key: "NO",
        label: "Nitric oxide",
        unit: "µg/m³",
        description: "Traffic and combustion emissions",
        group: "Gaseous pollutants",
    },
    {
        key: "NO2",
        label: "Nitrogen dioxide",
        unit: "µg/m³",
        description: "Combustion-related pollution",
        group: "Gaseous pollutants",
    },
    {
        key: "NOx",
        label: "Nitrogen oxides",
        unit: "µg/m³",
        description: "Combined nitrogen oxide indicator",
        group: "Gaseous pollutants",
    },
    {
        key: "NH3",
        label: "Ammonia",
        unit: "µg/m³",
        description: "Agricultural and industrial emissions",
        group: "Gaseous pollutants",
    },
    {
        key: "CO",
        label: "Carbon monoxide",
        unit: "mg/m³",
        description: "Incomplete combustion emissions",
        group: "Gaseous pollutants",
    },
    {
        key: "SO2",
        label: "Sulphur dioxide",
        unit: "µg/m³",
        description: "Fuel combustion emissions",
        group: "Gaseous pollutants",
    },
    {
        key: "O3",
        label: "Ozone",
        unit: "µg/m³",
        description: "Ground-level ozone",
        group: "Gaseous pollutants",
    },
    {
        key: "Benzene",
        label: "Benzene",
        unit: "µg/m³",
        description: "Volatile organic compound",
        group: "Organic compounds",
    },
    {
        key: "Toluene",
        label: "Toluene",
        unit: "µg/m³",
        description: "Volatile organic compound",
        group: "Organic compounds",
    },
];

const CITIES = [
    "Delhi",
    "Ahmedabad",
    "Bengaluru",
    "Chennai",
    "Gurugram",
    "Hyderabad",
    "Kolkata",
    "Lucknow",
    "Mumbai",
    "Patna",
    "Visakhapatnam",
];

const SAMPLE_VALUES = {
    "PM2.5": "80",
    PM10: "120",
    NO: "10",
    NO2: "20",
    NOx: "30",
    NH3: "15",
    CO: "1",
    SO2: "10",
    O3: "25",
    Benzene: "1",
    Toluene: "5",
};

const INITIAL_DATE = new Date().toISOString().slice(0, 10);

function makeInitialValues() {
    return Object.fromEntries(
        POLLUTANTS.map(({ key }) => [key, ""])
    );
}

export default function PredictionForm({
    onPredict,
    loading = false,
}) {
    const [city, setCity] = useState("Delhi");
    const [date, setDate] = useState(INITIAL_DATE);
    const [values, setValues] = useState(makeInitialValues);
    const [formError, setFormError] = useState("");
    const [sampleLoaded, setSampleLoaded] = useState(false);

    const filledCount = POLLUTANTS.filter(
        ({ key }) => values[key].trim() !== ""
    ).length;

    function updateValue(key, value) {
        setValues((previous) => ({
            ...previous,
            [key]: value,
        }));

        setFormError("");
        setSampleLoaded(false);
    }

    function loadSample() {
        setValues({ ...SAMPLE_VALUES });
        setFormError("");
        setSampleLoaded(true);
    }

    function resetForm() {
        setValues(makeInitialValues());
        setDate(INITIAL_DATE);
        setCity("Delhi");
        setFormError("");
        setSampleLoaded(false);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setFormError("");

        if (!date) {
            setFormError("Select a date before running the prediction.");
            return;
        }

        const missing = POLLUTANTS.filter(
            ({ key }) => values[key].trim() === ""
        );

        if (missing.length > 0) {
            setFormError(
                `Enter values for all pollutants. ${missing.length} field(s) still need attention.`
            );
            return;
        }

        const invalid = POLLUTANTS.find(({ key }) => {
            const number = Number(values[key]);
            return !Number.isFinite(number) || number < 0;
        });

        if (invalid) {
            setFormError(
                `${invalid.label} must be a valid, non-negative number.`
            );
            return;
        }

        const selectedDate = new Date(`${date}T12:00:00`);

        const payload = {
            City: city,
            Month: selectedDate.getMonth() + 1,
            DayOfWeek: selectedDate.getDay(),
        };

        for (const { key } of POLLUTANTS) {
            payload[key] = Number(values[key]);
        }

        try {
            await onPredict(payload);
        } catch (error) {
            setFormError(
                error?.message || "Prediction failed. Please try again."
            );
        }
    }

    const groups = [
        {
            title: "Particulate matter",
            subtitle: "Airborne particles",
            icon: Activity,
        },
        {
            title: "Gaseous pollutants",
            subtitle: "Combustion and atmospheric gases",
            icon: Wind,
        },
        {
            title: "Organic compounds",
            subtitle: "Volatile organic pollutants",
            icon: Sparkles,
        },
    ];

    return (
        <motion.section
            className="prediction-v2-panel"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
        >
            <div className="prediction-v2-heading">
                <div className="prediction-v2-heading-icon">
                    <Activity size={22} />
                </div>

                <div className="prediction-v2-heading-copy">
                    <span className="prediction-v2-eyebrow">
                        MODEL CONFIGURATION
                    </span>
                    <h2>Run a prediction</h2>
                    <p>
                        Configure your location and provide the measured
                        pollutant concentrations.
                    </p>
                </div>

                <div className="prediction-v2-model-badge">
                    <span />
                    Random Forest
                </div>
            </div>

            <div className="prediction-v2-progress">
                <div className="prediction-v2-progress-copy">
                    <span>Pollutant inputs</span>
                    <strong>
                        {filledCount}
                        <span> / {POLLUTANTS.length}</span>
                    </strong>
                </div>

                <div className="prediction-v2-progress-track">
                    <motion.div
                        className="prediction-v2-progress-fill"
                        initial={false}
                        animate={{
                            width: `${(filledCount / POLLUTANTS.length) * 100}%`,
                        }}
                        transition={{ duration: 0.25 }}
                    />
                </div>
            </div>

            <form
                className="prediction-v2-form"
                onSubmit={handleSubmit}
            >
                <div className="prediction-v2-location-grid">
                    <label className="prediction-v2-field">
                        <span className="prediction-v2-label">
                            City <span>*</span>
                        </span>

                        <span className="prediction-v2-select-wrap">
                            <select
                                value={city}
                                onChange={(event) => setCity(event.target.value)}
                                disabled={loading}
                                required
                            >
                                {CITIES.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown size={16} />
                        </span>
                    </label>

                    <label className="prediction-v2-field">
                        <span className="prediction-v2-label">
                            Observation date <span>*</span>
                        </span>

                        <span className="prediction-v2-date-wrap">
                            <CalendarDays size={17} />
                            <input
                                type="date"
                                value={date}
                                onChange={(event) => setDate(event.target.value)}
                                disabled={loading}
                                required
                            />
                        </span>
                    </label>
                </div>

                <div className="prediction-v2-divider">
                    <span />
                    <p>Pollutant concentrations</p>
                    <span />
                </div>

                {groups.map((group, groupIndex) => {
                    const GroupIcon = group.icon;
                    const items = POLLUTANTS.filter(
                        (pollutant) => pollutant.group === group.title
                    );

                    return (
                        <section
                            className="prediction-v2-group"
                            key={group.title}
                        >
                            <div className="prediction-v2-group-heading">
                                <div className="prediction-v2-group-icon">
                                    <GroupIcon size={18} />
                                </div>

                                <div>
                                    <h3>{group.title}</h3>
                                    <p>{group.subtitle}</p>
                                </div>

                                <span className="prediction-v2-group-number">
                                    {String(groupIndex + 1).padStart(2, "0")}
                                </span>
                            </div>

                            <div className="prediction-v2-fields-grid">
                                {items.map((pollutant, index) => (
                                    <label
                                        className="prediction-v2-field"
                                        key={pollutant.key}
                                    >
                                        <span className="prediction-v2-label">
                                            {pollutant.label}
                                            <span>*</span>
                                        </span>

                                        <span className="prediction-v2-input-wrap">
                                            <input
                                                type="number"
                                                min="0"
                                                step="any"
                                                inputMode="decimal"
                                                placeholder="0.00"
                                                value={values[pollutant.key]}
                                                onChange={(event) =>
                                                    updateValue(
                                                        pollutant.key,
                                                        event.target.value
                                                    )
                                                }
                                                disabled={loading}
                                                required
                                                aria-label={`${pollutant.label} in ${pollutant.unit}`}
                                            />

                                            <span className="prediction-v2-unit">
                                                {pollutant.unit}
                                            </span>
                                        </span>

                                        <span className="prediction-v2-field-help">
                                            {pollutant.description}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </section>
                    );
                })}

                {formError && (
                    <motion.div
                        className="prediction-v2-error"
                        role="alert"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span>!</span>
                        {formError}
                    </motion.div>
                )}

                {sampleLoaded && (
                    <div className="prediction-v2-sample-note">
                        <Check size={16} />
                        Sample values loaded for interface testing.
                    </div>
                )}

                <div className="prediction-v2-actions">
                    <button
                        type="button"
                        className="prediction-v2-secondary"
                        onClick={loadSample}
                        disabled={loading}
                    >
                        <Sparkles size={16} />
                        Fill sample data
                    </button>

                    <button
                        type="button"
                        className="prediction-v2-reset"
                        onClick={resetForm}
                        disabled={loading}
                        aria-label="Reset prediction form"
                        title="Reset form"
                    >
                        <RotateCcw size={16} />
                    </button>

                    <button
                        type="submit"
                        className="prediction-v2-submit"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="prediction-v2-spinner" />
                                Analysing data...
                            </>
                        ) : (
                            <>
                                <Activity size={18} />
                                Predict air quality
                                <span>→</span>
                            </>
                        )}
                    </button>
                </div>

                <p className="prediction-v2-footnote">
                    Use pollutant values in the units expected by your training
                    dataset. Sample values are for interface testing only.
                </p>
            </form>
        </motion.section>
    );
}
