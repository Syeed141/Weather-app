import { useState, useEffect, useRef } from "react";

const API_BASE = "http://localhost:3000";

const weatherIcons = {
  sunny: "☀️", clear: "🌙", cloudy: "☁️", overcast: "🌫️",
  rain: "🌧️", drizzle: "🌦️", thunder: "⛈️", snow: "❄️",
  fog: "🌁", mist: "🌫️", blizzard: "🌨️", sleet: "🌨️",
  default: "🌤️"
};

function getWeatherEmoji(condition = "") {
  const c = condition.toLowerCase();
  if (c.includes("thunder")) return weatherIcons.thunder;
  if (c.includes("snow") || c.includes("blizzard")) return weatherIcons.snow;
  if (c.includes("sleet")) return weatherIcons.sleet;
  if (c.includes("rain") || c.includes("shower")) return weatherIcons.rain;
  if (c.includes("drizzle")) return weatherIcons.drizzle;
  if (c.includes("fog")) return weatherIcons.fog;
  if (c.includes("mist") || c.includes("haze")) return weatherIcons.mist;
  if (c.includes("overcast")) return weatherIcons.overcast;
  if (c.includes("cloudy") || c.includes("cloud")) return weatherIcons.cloudy;
  if (c.includes("clear") || c.includes("night")) return weatherIcons.clear;
  if (c.includes("sunny") || c.includes("sun")) return weatherIcons.sunny;
  return weatherIcons.default;
}

function getGradient(condition = "", temp = 20) {
  const c = condition.toLowerCase();
  if (c.includes("thunder")) return ["#1a1a2e", "#16213e", "#0f3460"];
  if (c.includes("snow") || c.includes("blizzard")) return ["#e8f4f8", "#c9e8f0", "#a8d8e8"];
  if (c.includes("rain") || c.includes("shower") || c.includes("drizzle")) return ["#2c3e50", "#3d5a80", "#5b7fa6"];
  if (c.includes("fog") || c.includes("mist") || c.includes("overcast")) return ["#636e72", "#74859a", "#95a5a6"];
  if (c.includes("cloud")) return ["#485563", "#29323c", "#6c7a89"];
  if (temp > 35) return ["#c0392b", "#e74c3c", "#e67e22"];
  if (temp > 25) return ["#f39c12", "#e67e22", "#d35400"];
  if (temp > 15) return ["#1a6b3c", "#27ae60", "#2ecc71"];
  if (temp > 5)  return ["#2980b9", "#3498db", "#5dade2"];
  return ["#1c3d5a", "#2471a3", "#5499c2"];
}

const StatCard = ({ label, value, unit, icon, delay }) => (
  <div className="stat-card" style={{ animationDelay: `${delay}ms` }}>
    <span className="stat-icon">{icon}</span>
    <div className="stat-body">
      <div className="stat-value">{value}<span className="stat-unit">{unit}</span></div>
      <div className="stat-label">{label}</div>
    </div>
  </div>
);

export default function WeatherApp() {
  const [city, setCity] = useState("Pabna");
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [animate, setAnimate] = useState(false);
  const inputRef = useRef();

  const fetchWeather = async (targetCity) => {
    setLoading(true);
    setError("");
    setAnimate(false);
    try {
      const res = await fetch(`${API_BASE}/weather?city=${encodeURIComponent(targetCity)}`);
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "City not found");
      setWeather(data);
      setTimeout(() => setAnimate(true), 50);
    } catch (e) {
      setError(e.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchWeather("Pabna"); }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setCity(input.trim());
    fetchWeather(input.trim());
    setInput("");
  };

  const grad = weather
    ? getGradient(weather.weather.condition, weather.weather.temp_c)
    : ["#1a1a2e", "#16213e", "#0f3460"];

  const isLight = weather && weather.weather.condition.toLowerCase().includes("snow");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: #0d0d0d;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .app {
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
          background: linear-gradient(135deg, ${grad[0]}, ${grad[1]}, ${grad[2]});
          transition: background 1.2s ease;
        }

        .card {
          width: 100%;
          max-width: 460px;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(32px);
          -webkit-backdrop-filter: blur(32px);
          border-radius: 32px;
          border: 1px solid rgba(255,255,255,0.15);
          padding: 36px 32px;
          box-shadow: 0 32px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2);
          color: ${isLight ? "#1a1a2e" : "#fff"};
        }

        /* Search */
        .search-form {
          display: flex;
          gap: 10px;
          margin-bottom: 36px;
        }
        .search-input {
          flex: 1;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 14px;
          padding: 12px 18px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          color: inherit;
          outline: none;
          transition: all 0.25s;
        }
        .search-input::placeholder { color: rgba(255,255,255,0.45); }
        .search-input:focus {
          background: rgba(255,255,255,0.16);
          border-color: rgba(255,255,255,0.45);
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
        .search-btn {
          background: rgba(255,255,255,0.18);
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 14px;
          padding: 12px 18px;
          color: inherit;
          font-size: 18px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .search-btn:hover { background: rgba(255,255,255,0.28); transform: scale(1.05); }
        .search-btn:active { transform: scale(0.97); }

        /* Main weather */
        .weather-main {
          text-align: center;
          margin-bottom: 32px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .weather-main.show { opacity: 1; transform: translateY(0); }

        .weather-emoji {
          font-size: 88px;
          line-height: 1;
          display: block;
          margin-bottom: 8px;
          filter: drop-shadow(0 8px 24px rgba(0,0,0,0.3));
          animation: float 4s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .location-name {
          font-family: 'Syne', sans-serif;
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -0.5px;
          margin-bottom: 2px;
        }
        .location-country {
          font-size: 13px;
          opacity: 0.6;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 16px;
        }

        .temp-display {
          font-family: 'Syne', sans-serif;
          font-size: 86px;
          font-weight: 800;
          line-height: 1;
          letter-spacing: -4px;
          margin-bottom: 8px;
        }
        .temp-display sup {
          font-size: 36px;
          font-weight: 600;
          letter-spacing: 0;
          vertical-align: super;
          opacity: 0.7;
        }

        .condition-text {
          font-size: 16px;
          opacity: 0.75;
          font-weight: 400;
          margin-bottom: 6px;
        }
        .feels-like {
          font-size: 13px;
          opacity: 0.5;
        }

        /* Divider */
        .divider {
          height: 1px;
          background: rgba(255,255,255,0.12);
          margin: 0 -8px 28px;
          opacity: 0;
          transition: opacity 0.6s 0.3s;
        }
        .divider.show { opacity: 1; }

        /* Stats grid */
        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .stat-card {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 18px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          opacity: 0;
          transform: translateY(12px);
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .stat-card.show { opacity: 1; transform: translateY(0); }
        .stat-card:hover {
          background: rgba(255,255,255,0.12);
          transform: translateY(-2px) scale(1.02);
        }

        .stat-icon { font-size: 26px; }
        .stat-value {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 700;
          line-height: 1.1;
        }
        .stat-unit { font-size: 12px; opacity: 0.6; font-weight: 400; margin-left: 2px; }
        .stat-label { font-size: 11px; opacity: 0.5; text-transform: uppercase; letter-spacing: 1px; margin-top: 2px; }

        /* Localtime */
        .localtime {
          text-align: center;
          font-size: 12px;
          opacity: 0.35;
          margin-top: 24px;
          letter-spacing: 0.5px;
        }

        /* Loading */
        .loader {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          padding: 40px 0;
          opacity: 0;
          animation: fadeIn 0.4s forwards 0.1s;
        }
        .loader-emoji {
          font-size: 52px;
          animation: spin 1.5s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fadeIn { to { opacity: 1; } }
        .loader-text { font-size: 14px; opacity: 0.55; }

        /* Error */
        .error-box {
          text-align: center;
          padding: 32px 16px;
        }
        .error-emoji { font-size: 48px; margin-bottom: 12px; display: block; }
        .error-msg { font-size: 15px; opacity: 0.7; margin-bottom: 16px; }
        .retry-btn {
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 12px;
          padding: 10px 24px;
          color: inherit;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .retry-btn:hover { background: rgba(255,255,255,0.25); }
      `}</style>

      <div className="app">
        <div className="card">

          {/* Search */}
          <form className="search-form" onSubmit={handleSearch}>
            <input
              ref={inputRef}
              className="search-input"
              type="text"
              placeholder="Search city..."
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <button className="search-btn" type="submit">🔍</button>
          </form>

          {/* Loading */}
          {loading && (
            <div className="loader">
              <span className="loader-emoji">🌀</span>
              <span className="loader-text">Fetching weather...</span>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="error-box">
              <span className="error-emoji">😶‍🌫️</span>
              <p className="error-msg">{error}</p>
              <button className="retry-btn" onClick={() => fetchWeather(city)}>Try again</button>
            </div>
          )}

          {/* Weather data */}
          {!loading && weather && (
            <>
              <div className={`weather-main ${animate ? "show" : ""}`}>
                <span className="weather-emoji">
                  {getWeatherEmoji(weather.weather.condition)}
                </span>
                <div className="location-name">{weather.location.name}</div>
                <div className="location-country">{weather.location.country}</div>
                <div className="temp-display">
                  {Math.round(weather.weather.temp_c)}<sup>°C</sup>
                </div>
                <div className="condition-text">{weather.weather.condition}</div>
                <div className="feels-like">Feels like {Math.round(weather.weather.feels_like_c)}°C</div>
              </div>

              <div className={`divider ${animate ? "show" : ""}`} />

              <div className="stats-grid">
                {[
                  { label: "Humidity", value: weather.weather.humidity, unit: "%", icon: "💧", delay: 100 },
                  { label: "Wind", value: Math.round(weather.weather.wind_kph), unit: " km/h", icon: "🌬️", delay: 180 },
                  { label: "Visibility", value: weather.weather.visibility_km, unit: " km", icon: "👁️", delay: 260 },
                  { label: "UV Index", value: weather.weather.uv, unit: "", icon: "🔆", delay: 340 },
                ].map(s => (
                  <StatCard key={s.label} {...s} />
                ))}
              </div>
              {/* Trigger stat card animations */}
              {animate && document.querySelectorAll(".stat-card").forEach(el => el.classList.add("show"))}

              <div className="localtime">🕐 {weather.location.localtime}</div>
            </>
          )}
        </div>
      </div>
    </>
  );
}