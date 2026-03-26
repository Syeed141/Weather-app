export default function Tabs({ activeTab, onChange }) {
  return (
    <div className="tabs-wrap">
      <button
        className={`tab-btn ${activeTab === "weather" ? "active" : ""}`}
        onClick={() => onChange("weather")}
      >
        Weather
      </button>

      <button
        className={`tab-btn ${activeTab === "favorites" ? "active" : ""}`}
        onClick={() => onChange("favorites")}
      >
        Favorites
      </button>
    </div>
  );
}