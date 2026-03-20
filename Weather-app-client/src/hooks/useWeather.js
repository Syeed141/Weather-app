import { useCallback, useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

export function useWeather() {
  const [weather, setWeather] = useState(null);
  const [hourly, setHourly] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hourlyLoading, setHourlyLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = useCallback(async (city) => {
    if (!city.trim()) return;

    setLoading(true);
    setHourlyLoading(true);
    setError("");

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
      setHourlyLoading(false);
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

  return {
    weather,
    hourly,
    loading,
    hourlyLoading,
    error,
    fetchWeather,
    fetchFavoritesWeather,
  };
}