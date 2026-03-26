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

import AIInsights from "./components/AIInsights";

import "./styles/weather.css";

export default function App() {
  const [activeTab, setActiveTab] = useState("weather");

  const {
    weather,
    hourly,
    loading,
    error,
    fetchWeather,
    fetchWeatherByCoords,
    fetchFavoritesWeather,
    aiSummary,
    aiActivity,
    aiOutfit,
    aiLoading,
    activityLoading,
    outfitLoading,
    callAi,
  } = useWeather();

  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    fetchWeather("Pabna");
  }, [fetchWeather]);

  useEffect(() => {
    if (weather) {
      callAi("summary");
    }
  }, [weather, callAi]);

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

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        await fetchWeatherByCoords(coords.latitude, coords.longitude);
        setActiveTab("weather");
      },
      () => {
        alert("Location access denied.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      },
    );
  };

  return (
    <div className="app-shell">
      <AnimatedBg colors={colors} type={particleType} />

      <div className="app-content">
        <SearchBar
          onSearch={fetchWeather}
          onUseLocation={handleUseLocation}
          loading={loading}
        />

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
                  isFavorite={
                    weather?.location?.name
                      ? isFavorite(weather.location.name)
                      : false
                  }
                />
                <AIInsights
                  weather={weather}
                  aiSummary={aiSummary}
                  aiActivity={aiActivity}
                  aiOutfit={aiOutfit}
                  aiLoading={aiLoading}
                  activityLoading={activityLoading}
                  outfitLoading={outfitLoading}
                  onAskActivity={() => callAi("activity")}
                  onAskOutfit={() => callAi("outfit")}
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
