import { getEmoji } from "../utils/weatherTheme";

export default function WeatherHero({ weather, onToggleFavorite, isFavorite }) {
  if (!weather) return null;

  const { location, weather: current } = weather;

  return (
    <div className="weather-hero glass-card">
      <div className="hero-top">
        <div>
          <h1 className="hero-city">
            {location.name}, {location.country}
          </h1>
          <p className="hero-time">{location.localtime}</p>
          <p className="hero-condition">{current.condition}</p>
        </div>

        <button
          className="fav-toggle"
          onClick={() => onToggleFavorite(location.name)}
          aria-label="Toggle favorite city"
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </div>

      <div className="hero-main">
        <div className="hero-icon">{getEmoji(current.condition)}</div>

        <div>
          <div className="hero-temp">{Math.round(current.temp_c)}°C</div>
          <div className="hero-feels">
            Feels like {Math.round(current.feels_like_c)}°C
          </div>
        </div>
      </div>
    </div>
  );
}