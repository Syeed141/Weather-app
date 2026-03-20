import { useEffect, useMemo, useState } from "react";
import AnimatedBg from "./components/AnimatedBg";
import FavoritesPanel from "./components/FavoritesPanel";
import HourlyChart from "./components/HourlyChart";
import SearchBar from "./components/SearchBar";
import StatsGrid from "./components/StatsGrid";
import Tabs from "./components/Tabs";
import WeatherHero from "./components/WeatherHero";
import WeatherSkeleton from "./components/WeatherSkeleton";
import { useFavorites } from "./hooks/useFavorites";
import { useWeather } from "./hooks/useWeather";
import { getGradient, getParticles } from "./utils/weatherTheme";
import "./styles/weather.css";

export default function App() {
  const [activeTab, setActiveTab] = useState("weather");

  const {
    weather,
    hourly,
    loading,
    error,
    fetchWeather,
    fetchFavoritesWeather,
  } = useWeather();

  const {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  } = useFavorites();

  useEffect(() => {
    fetchWeather("Pabna");
  }, [fetchWeather]);

  const colors = useMemo(() => {
    const condition = weather?.weather?.condition || "";
    const temp = weather?.weather?.temp_c ?? 20;
    return getGradient(condition, temp);
  }, [weather]);

  const particleType = useMemo(() => {
    const condition = weather?.weather?.condition || "";
    return getParticles(condition);
  }, [weather]);

  const handleToggleFavorite = (city) => {
    if (isFavorite(city)) {
      removeFavorite(city);
    } else {
      addFavorite(city);
    }
  };

  return (
    <div className="app-shell">
      <AnimatedBg colors={colors} type={particleType} />

      <div className="app-content">
        <SearchBar onSearch={fetchWeather} loading={loading} />

        <Tabs activeTab={activeTab} onChange={setActiveTab} />

        {error && <div className="error-box">{error}</div>}

        {activeTab === "weather" && (
          <>
            {loading ? (
              <WeatherSkeleton />
            ) : (
              <>
                <WeatherHero
                  weather={weather}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={weather?.location?.name ? isFavorite(weather.location.name) : false}
                />
                <StatsGrid weather={weather} />
                <HourlyChart hourly={hourly} />
              </>
            )}
          </>
        )}

        {activeTab === "favorites" && (
          <FavoritesPanel
            favorites={favorites}
            fetchFavoritesWeather={fetchFavoritesWeather}
            onRemove={removeFavorite}
            onSelect={(city) => {
              setActiveTab("weather");
              fetchWeather(city);
            }}
          />
        )}
      </div>
    </div>
  );
}