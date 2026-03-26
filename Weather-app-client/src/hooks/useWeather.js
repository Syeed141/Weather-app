import { useCallback, useState } from "react";
import {
  getActivityAdvice,
  getOutfitSuggestion,
  getWeatherSummary,
} from "../utils/puterAI";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

export function useWeather() {
  const [weather, setWeather] = useState(null);
  const [hourly, setHourly] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [aiSummary, setAiSummary] = useState("");
  const [aiActivity, setAiActivity] = useState(null);
  const [aiOutfit, setAiOutfit] = useState(null);

  const [aiLoading, setAiLoading] = useState(false);
  const [activityLoading, setActivityLoading] = useState(false);
  const [outfitLoading, setOutfitLoading] = useState(false);

  const clearAi = () => {
    setAiSummary("");
    setAiActivity("");
    setAiOutfit("");
  };

  const fetchWeather = useCallback(async (city) => {
    if (!city.trim()) return;

    setLoading(true);
    setError("");
    clearAi();

    try {
      const [weatherRes, hourlyRes] = await Promise.all([
        fetch(`${API}/weather?city=${encodeURIComponent(city)}`),
        fetch(`${API}/hourly?city=${encodeURIComponent(city)}`),
      ]);

      const [weatherData, hourlyData] = await Promise.all([
        weatherRes.json(),
        hourlyRes.json(),
      ]);

      if (!weatherRes.ok || !weatherData.success) {
        throw new Error(weatherData.error || "Failed to fetch weather");
      }

      setWeather(weatherData);

      if (hourlyRes.ok && hourlyData.success) {
        setHourly(hourlyData.hourly || []);
      } else {
        setHourly([]);
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
      setWeather(null);
      setHourly([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWeatherByCoords = useCallback(async (lat, lon) => {
    setLoading(true);
    setError("");
    clearAi();

    try {
      const [weatherRes, hourlyRes] = await Promise.all([
        fetch(`${API}/weather/by-coords?lat=${lat}&lon=${lon}`),
        fetch(`${API}/hourly/by-coords?lat=${lat}&lon=${lon}`),
      ]);

      const [weatherData, hourlyData] = await Promise.all([
        weatherRes.json(),
        hourlyRes.json(),
      ]);

      if (!weatherRes.ok || !weatherData.success) {
        throw new Error(weatherData.error || "Failed to fetch current location weather");
      }

      setWeather(weatherData);

      if (hourlyRes.ok && hourlyData.success) {
        setHourly(hourlyData.hourly || []);
      } else {
        setHourly([]);
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
      setWeather(null);
      setHourly([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchFavoritesWeather = useCallback(async (cities) => {
    if (!cities.length) return [];

    try {
      const res = await fetch(`${API}/favorites/weather`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cities }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to fetch favorites");
      }

      return data.results || [];
    } catch {
      return [];
    }
  }, []);

  const callAi = useCallback(async (mode) => {
    if (!weather) return "";

    try {
      if (mode === "summary") {
        setAiLoading(true);
        const text = await getWeatherSummary(weather);
        setAiSummary(text);
        return text;
      }

      if (mode === "activity") {
        setActivityLoading(true);
        const text = await getActivityAdvice(weather);
        setAiActivity(text);
        return text;
      }

      if (mode === "outfit") {
        setOutfitLoading(true);
        const text = await getOutfitSuggestion(weather);
        setAiOutfit(text);
        return text;
      }

      return "";
    } catch (err) {
      const fallback = "AI insight unavailable right now.";
      if (mode === "summary") setAiSummary(fallback);
      if (mode === "activity") setAiActivity(fallback);
      if (mode === "outfit") setAiOutfit(fallback);
      return "";
    } finally {
      if (mode === "summary") setAiLoading(false);
      if (mode === "activity") setActivityLoading(false);
      if (mode === "outfit") setOutfitLoading(false);
    }
  }, [weather]);

  return {
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
  };
}