import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

export default function CityTrendChart({ data = [], title = "Trend Overview" }) {
    return (
        <section className="chart-panel">
            <div className="chart-panel-heading">
                <div>
                    <h3>{title}</h3>
                    <p>Illustrative trend data until live data is connected</p>
                </div>

                <span className="chart-legend">
                    <span />
                    Sample trend
                </span>
            </div>

            <div className="chart-container">
                {data.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={data}
                            margin={{ top: 12, right: 10, left: -18, bottom: 0 }}
                        >
                            <CartesianGrid
                                stroke="rgba(142,180,208,0.10)"
                                strokeDasharray="4 5"
                                vertical={false}
                            />

                            <XAxis
                                dataKey="label"
                                tick={{ fill: "#8193a8", fontSize: 11 }}
                                axisLine={false}
                                tickLine={false}
                                tickMargin={12}
                            />

                            <YAxis
                                tick={{ fill: "#8193a8", fontSize: 11 }}
                                axisLine={false}
                                tickLine={false}
                                tickMargin={8}
                            />

                            <Tooltip
                                contentStyle={{
                                    background: "#101a28",
                                    border: "1px solid #2b4054",
                                    borderRadius: "10px",
                                    color: "#edf7ff",
                                    fontSize: "12px",
                                }}
                            />

                            <Line
                                type="monotone"
                                dataKey="value"
                                name="Sample value"
                                stroke="#40e0d0"
                                strokeWidth={2.5}
                                dot={false}
                                activeDot={{ r: 5, fill: "#40e0d0" }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="chart-empty-state">
                        No trend data available yet.
                    </div>
                )}
            </div>
        </section>
    );
}