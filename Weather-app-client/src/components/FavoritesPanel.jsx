import { useEffect, useState } from "react";
import { getEmoji } from "../utils/weatherTheme";

export default function FavoritesPanel({
  favorites,
  fetchFavoritesWeather,
  onRemove,
  onSelect,
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!favorites.length) {
        setItems([]);
        return;
      }

      setLoading(true);
      const results = await fetchFavoritesWeather(favorites);
      setItems(results);
      setLoading(false);
    };

    load();
  }, [favorites, fetchFavoritesWeather]);

  if (!favorites.length) {
    return (
      <div className="glass-card empty-state">
        <h3>No favorites yet</h3>
        <p>Search a city and save it to favorites.</p>
      </div>
    );
  }

  return (
    <div className="favorites-wrap">
      {loading ? (
        <div className="glass-card empty-state">
          <p>Loading favorite cities...</p>
        </div>
      ) : (
        items.map((item) => (
          <div key={item.city} className="favorite-card glass-card">
            {item.error ? (
              <>
                <div>
                  <h3>{item.city}</h3>
                  <p>{item.error}</p>
                </div>
                <button className="remove-btn" onClick={() => onRemove(item.city)}>
                  Remove
                </button>
              </>
            ) : (
              <>
                <div className="favorite-left" onClick={() => onSelect(item.name)}>
                  <div className="favorite-icon">{getEmoji(item.condition)}</div>
                  <div>
                    <h3>
                      {item.name}, {item.country}
                    </h3>
                    <p>{item.condition}</p>
                  </div>
                </div>

                <div className="favorite-right">
                  <div className="favorite-temp">{Math.round(item.temp_c)}°C</div>
                  <button className="remove-btn" onClick={() => onRemove(item.city)}>
                    Remove
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}