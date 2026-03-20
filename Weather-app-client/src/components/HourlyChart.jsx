import { getEmoji } from "../utils/weatherTheme";

export default function HourlyChart({ hourly }) {
  if (!hourly?.length) return null;

  return (
    <div className="hourly-section glass-card">
      <h2 className="section-title">Next Hours</h2>

      <div className="hourly-list">
        {hourly.map((item, index) => (
          <div key={`${item.time}-${index}`} className="hour-card">
            <div className="hour-time">{item.time}</div>
            <div className="hour-icon">{getEmoji(item.condition)}</div>
            <div className="hour-temp">{Math.round(item.temp_c)}°</div>
            <div className="hour-rain">💧 {item.chance_of_rain}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}