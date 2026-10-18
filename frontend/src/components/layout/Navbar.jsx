import { Activity, ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            <Link to="/" className="brand">
                <span className="brand-icon">
                    <Activity size={22} />
                </span>
                <span>
                    <strong>SmartCity</strong>
                    <small>INTELLIGENCE PLATFORM</small>
                </span>
            </Link>

            <button
                className="mobile-menu-button"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
                {menuOpen ? <X /> : <Menu />}
            </button>

            <div className={`nav-links ${menuOpen ? "nav-links-open" : ""}`}>
                <a href="#solutions" onClick={() => setMenuOpen(false)}>
                    Solutions
                </a>
                <a href="#technology" onClick={() => setMenuOpen(false)}>
                    Technology
                </a>
                <a href="#about" onClick={() => setMenuOpen(false)}>
                    About
                </a>

                <Link
                    to="/dashboard"
                    className="button button-primary nav-cta"
                    onClick={() => setMenuOpen(false)}
                >
                    Launch Dashboard <ArrowUpRight size={17} />
                </Link>
            </div>
        </nav>
    );
}