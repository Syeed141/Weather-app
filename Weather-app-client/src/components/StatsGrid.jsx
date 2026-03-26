export default function StatsGrid({ weather }) {
  if (!weather) return null;

  const current = weather.weather;

  const stats = [
    { label: "Humidity", value: current.humidity, unit: "%", icon: "💧" },
    { label: "Wind", value: current.wind_kph, unit: "kph", icon: "🌬️" },
    { label: "UV Index", value: current.uv, unit: "", icon: "☀️" },
    { label: "Visibility", value: current.visibility_km, unit: "km", icon: "👀" },
  ];

  return (
    <div className="stats-grid ">
      {stats.map((item) => (
        <div key={item.label} className="stat-card glass-card">
          <div className="stat-icon">{item.icon}</div>
          <div className="stat-value">
            {item.value}
            <span className="stat-unit">{item.unit}</span>
          </div>
          <div className="stat-label">{item.label}</div>
        </div>
      ))}
    </div>
  );
}