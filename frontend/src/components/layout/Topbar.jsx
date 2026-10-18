
import { useEffect, useState } from "react";
import {
    Activity,
    Bell,
    CalendarDays,
    Menu,
    RefreshCw,
    Wifi,
    WifiOff,
} from "lucide-react";
import { checkBackendHealth } from "../../services/api";

export default function Topbar({ onMenuClick }) {
    const [backendStatus, setBackendStatus] = useState("checking");
    const [lastChecked, setLastChecked] = useState(null);
    const [checking, setChecking] = useState(false);

    async function checkConnection() {
        setChecking(true);

        try {
            await checkBackendHealth();
            setBackendStatus("connected");
        } catch {
            setBackendStatus("disconnected");
        } finally {
            setLastChecked(new Date());
            setChecking(false);
        }
    }

    useEffect(() => {
        checkConnection();

        const interval = window.setInterval(checkConnection, 30000);
        return () => window.clearInterval(interval);
    }, []);

    const today = new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    const statusLabel = {
        connected: "API Connected",
        disconnected: "API Offline",
        checking: "Checking API",
    }[backendStatus];

    return (
        <header className="dashboard-topbar">
            <div className="topbar-left">
                <button
                    type="button"
                    className="topbar-menu-button"
                    onClick={onMenuClick}
                    aria-label="Toggle navigation"
                >
                    <Menu size={20} />
                </button>

                <div className="topbar-heading">
                    <span>SMARTCITY AI</span>
                    <strong>Urban Intelligence</strong>
                </div>
            </div>

            <div className="topbar-right">
                <div className="topbar-date">
                    <CalendarDays size={16} />
                    <span>{today}</span>
                </div>

                <div
                    className={`backend-status backend-status-${backendStatus}`}
                    title={
                        lastChecked
                            ? `Last checked: ${lastChecked.toLocaleTimeString()}`
                            : "Checking backend connection"
                    }
                    role="status"
                    aria-live="polite"
                >
                    {backendStatus === "connected" ? (
                        <Wifi size={15} />
                    ) : backendStatus === "disconnected" ? (
                        <WifiOff size={15} />
                    ) : (
                        <Activity size={15} />
                    )}

                    <span>{statusLabel}</span>
                </div>

                <button
                    type="button"
                    className="topbar-icon-button"
                    title="Refresh backend connection"
                    aria-label="Refresh backend connection"
                    onClick={checkConnection}
                    disabled={checking}
                >
                    <RefreshCw
                        size={17}
                        className={checking ? "refresh-spinning" : ""}
                    />
                </button>

                <button
                    type="button"
                    className="topbar-icon-button topbar-notification-button"
                    title="Notifications are not configured yet"
                    aria-label="Notifications"
                    onClick={() =>
                        window.alert(
                            "Notifications will be configured in a later step."
                        )
                    }
                >
                    <Bell size={18} />
                </button>
            </div>
        </header>
    );
}
