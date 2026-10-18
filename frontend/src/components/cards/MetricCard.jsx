import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

export default function MetricCard({
    title,
    value,
    unit = "",
    subtitle,
    icon: Icon,
    color = "#40e0d0",
    trend,
    trendLabel,
    status = "info",
}) {
    const TrendIcon =
        trend === "up"
            ? ArrowUpRight
            : trend === "down"
                ? ArrowDownRight
                : Minus;

    return (
        <motion.article
            className="metric-card"
            style={{ "--metric-color": color }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
        >
            <div className="metric-card-top">
                <div className="metric-icon">
                    {Icon && <Icon size={21} strokeWidth={1.8} />}
                </div>

                <span className={`metric-status metric-status-${status}`}>
                    {status === "warning"
                        ? "Attention"
                        : status === "success"
                            ? "Normal"
                            : "Overview"}
                </span>
            </div>

            <p className="metric-title">{title}</p>

            <div className="metric-value">
                <strong>{value}</strong>
                {unit && <span>{unit}</span>}
            </div>

            <div className="metric-card-bottom">
                <span>{subtitle || "Awaiting model integration"}</span>

                {trend && (
                    <span className={`metric-trend metric-trend-${trend}`}>
                        <TrendIcon size={14} />
                        {trendLabel || "Trend"}
                    </span>
                )}
            </div>
        </motion.article>
    );
}