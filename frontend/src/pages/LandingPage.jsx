import { motion } from "framer-motion";
import {
    Activity,
    ArrowDown,
    ArrowRight,
    BrainCircuit,
    Droplets,
    Gauge,
    Layers3,
    Leaf,
    Radio,
    ShieldCheck,
    Sparkles,
    Waves,
    Wind,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

const solutions = [
    {
        number: "01",
        title: "Air Intelligence",
        description:
            "Analyze air quality indicators and identify pollution risks.",
        icon: Wind,
        color: "#57c8ff",
    },
    {
        number: "02",
        title: "Traffic Intelligence",
        description:
            "Predict congestion and help cities understand traffic patterns.",
        icon: Gauge,
        color: "#a99aff",
    },
    {
        number: "03",
        title: "Flood Prediction",
        description:
            "Evaluate environmental conditions associated with flood risk.",
        icon: Waves,
        color: "#50d9c1",
    },
    {
        number: "04",
        title: "Water Management",
        description:
            "Monitor water-related indicators and support resource planning.",
        icon: Droplets,
        color: "#5da5ff",
    },
    {
        number: "05",
        title: "Waste Intelligence",
        description:
            "Support waste monitoring and collection planning.",
        icon: Layers3,
        color: "#a4e28a",
    },
    {
        number: "06",
        title: "City Risk Engine",
        description:
            "Bring urban risk indicators together for a broader city overview.",
        icon: ShieldCheck,
        color: "#ffb779",
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.09 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: "easeOut" },
    },
};

export default function LandingPage() {
    return (
        <div className="landing-page">
            <div className="ambient ambient-one" />
            <div className="ambient ambient-two" />

            <Navbar />

            <main>
                <section className="hero section-container">
                    <motion.div
                        className="hero-copy"
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        <motion.div className="eyebrow" variants={itemVariants}>
                            <span className="status-dot" />
                            INTELLIGENCE FOR THE CITIES OF TOMORROW
                        </motion.div>

                        <motion.h1 variants={itemVariants}>
                            Cities that think.
                            <br />
                            <span className="gradient-text">Futures that thrive.</span>
                        </motion.h1>

                        <motion.p className="hero-description" variants={itemVariants}>
                            One intelligent platform to understand urban challenges,
                            anticipate risks, and make smarter city decisions through
                            machine learning.
                        </motion.p>

                        <motion.div className="hero-actions" variants={itemVariants}>
                            <Link to="/dashboard" className="button button-primary">
                                Explore the Platform <ArrowRight size={18} />
                            </Link>
                            <a href="#solutions" className="button button-secondary">
                                Discover Solutions
                            </a>
                        </motion.div>

                        <motion.div className="hero-proof" variants={itemVariants}>
                            <div className="proof-icon">
                                <BrainCircuit size={20} />
                            </div>
                            <div>
                                <strong>6 intelligence modules</strong>
                                <span>One unified urban intelligence platform</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="hero-visual"
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.9, delay: 0.2 }}
                    >
                        <div className="visual-grid" />

                        <div className="orbit orbit-outer" />
                        <div className="orbit orbit-inner" />

                        <div className="city-core">
                            <div className="core-glow" />
                            <div className="core-icon">
                                <Activity size={46} strokeWidth={1.3} />
                            </div>
                            <span>URBAN AI CORE</span>
                            <small>CONNECTED INTELLIGENCE</small>
                        </div>

                        <div className="floating-module module-air">
                            <Wind size={19} />
                            <span>Air Quality</span>
                            <strong>AI Analysis</strong>
                        </div>

                        <div className="floating-module module-water">
                            <Droplets size={19} />
                            <span>Water Systems</span>
                            <strong>Monitoring</strong>
                        </div>

                        <div className="floating-module module-traffic">
                            <Gauge size={19} />
                            <span>Traffic Flow</span>
                            <strong>Prediction</strong>
                        </div>

                        <div className="floating-module module-risk">
                            <ShieldCheck size={19} />
                            <span>City Risk</span>
                            <strong>Assessment</strong>
                        </div>

                        <div className="visual-caption">
                            <Radio size={14} />
                            MULTI-SYSTEM INTELLIGENCE
                        </div>
                    </motion.div>

                    <a href="#solutions" className="scroll-indicator">
                        <ArrowDown size={16} />
                        EXPLORE THE ECOSYSTEM
                    </a>
                </section>

                <section className="capability-strip">
                    <div className="section-container capability-inner">
                        <div>
                            <Sparkles size={19} />
                            Machine Learning
                        </div>
                        <div>
                            <Activity size={19} />
                            Predictive Analytics
                        </div>
                        <div>
                            <Radio size={19} />
                            Unified Monitoring
                        </div>
                        <div>
                            <Leaf size={19} />
                            Sustainable Cities
                        </div>
                    </div>
                </section>

                <section id="solutions" className="solutions-section section-container">
                    <div className="section-heading">
                        <div className="eyebrow">
                            <span className="status-dot" />
                            SIX SYSTEMS. ONE VISION.
                        </div>

                        <h2>
                            Every urban challenge.
                            <br />
                            <span className="gradient-text">A smarter perspective.</span>
                        </h2>

                        <p>
                            A connected ecosystem designed to help analyze the systems that
                            keep a city running.
                        </p>
                    </div>

                    <motion.div
                        className="solutions-grid"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.12 }}
                    >
                        {solutions.map((solution) => {
                            const Icon = solution.icon;

                            return (
                                <motion.article
                                    className="solution-card"
                                    key={solution.number}
                                    variants={itemVariants}
                                    whileHover={{ y: -6 }}
                                    style={{ "--module-color": solution.color }}
                                >
                                    <div className="solution-top">
                                        <div className="solution-icon">
                                            <Icon size={23} />
                                        </div>
                                        <span>{solution.number}</span>
                                    </div>

                                    <h3>{solution.title}</h3>
                                    <p>{solution.description}</p>

                                    <Link to="/dashboard" className="solution-link">
                                        Explore module <ArrowRight size={16} />
                                    </Link>
                                </motion.article>
                            );
                        })}
                    </motion.div>
                </section>

                <section id="technology" className="technology-section">
                    <div className="section-container technology-inner">
                        <div className="technology-icon">
                            <BrainCircuit size={36} />
                        </div>

                        <div>
                            <div className="eyebrow">BUILT AROUND INTELLIGENCE</div>
                            <h2>From urban data to informed decisions.</h2>
                            <p>
                                Dedicated machine learning models, a unified API, and an
                                intuitive interface form the foundation of the platform.
                            </p>
                        </div>

                        <Link to="/dashboard" className="button button-secondary">
                            Open Dashboard <ArrowRight size={17} />
                        </Link>
                    </div>
                </section>

                <section id="about" className="about-section section-container">
                    <div>
                        <div className="eyebrow">THE BIGGER PICTURE</div>
                        <h2>
                            Better insights.
                            <br />
                            <span className="gradient-text">Better urban decisions.</span>
                        </h2>
                    </div>
                    <p>
                        Smart City AI brings multiple urban problem domains into one
                        interface, helping users explore predictions and understand
                        interconnected city risks.
                    </p>
                </section>
            </main>

            <footer className="site-footer section-container">
                <Link to="/" className="brand">
                    <span className="brand-icon">
                        <Activity size={20} />
                    </span>
                    <strong>SmartCity AI</strong>
                </Link>

                <span>Intelligence for a more sustainable urban future.</span>
                <span>© {new Date().getFullYear()} SmartCity AI</span>
            </footer>
        </div>
    );
}