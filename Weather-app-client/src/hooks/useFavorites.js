import { useEffect, useState } from "react";

const STORAGE_KEY = "weather-favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (city) => {
    const trimmed = city.trim();
    if (!trimmed) return;

    setFavorites((prev) => {
      const exists = prev.some((item) => item.toLowerCase() === trimmed.toLowerCase());
      if (exists) return prev;
      return [trimmed, ...prev].slice(0, 8);
    });
  };

  const removeFavorite = (city) => {
    setFavorites((prev) => prev.filter((item) => item.toLowerCase() !== city.toLowerCase()));
  };

  const isFavorite = (city) => {
    return favorites.some((item) => item.toLowerCase() === city.toLowerCase());
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
}