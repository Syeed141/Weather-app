export function getGradient(condition = "", temp = 20) {
  const c = condition.toLowerCase();

  if (c.includes("thunder")) return ["#0d0d1a", "#1a1035", "#2d1b69"];
  if (c.includes("snow") || c.includes("blizzard")) return ["#c5d8e8", "#9bb8d3", "#6a9ab8"];
  if (c.includes("rain") || c.includes("shower") || c.includes("drizzle")) {
    return ["#1a2a3a", "#1e3a5f", "#2a5298"];
  }
  if (c.includes("fog") || c.includes("mist") || c.includes("overcast")) {
    return ["#3a3d42", "#4a4e55", "#5a5f68"];
  }
  if (c.includes("cloud")) return ["#2c3e50", "#3b4f63", "#4a6278"];

  if (temp > 35) return ["#7f1d1d", "#b91c1c", "#ea580c"];
  if (temp > 28) return ["#92400e", "#d97706", "#f59e0b"];
  if (temp > 18) return ["#14532d", "#15803d", "#16a34a"];
  if (temp > 8) return ["#1e3a5f", "#1d4ed8", "#3b82f6"];

  return ["#1e1b4b", "#3730a3", "#4f46e5"];
}

export function getEmoji(condition = "") {
  const c = condition.toLowerCase();

  if (c.includes("thunder")) return "⛈️";
  if (c.includes("blizzard")) return "🌨️";
  if (c.includes("snow")) return "❄️";
  if (c.includes("sleet")) return "🌨️";
  if (c.includes("rain") || c.includes("shower")) return "🌧️";
  if (c.includes("drizzle")) return "🌦️";
  if (c.includes("fog") || c.includes("mist") || c.includes("haze")) return "🌫️";
  if (c.includes("overcast")) return "☁️";
  if (c.includes("cloud")) return "⛅";
  if (c.includes("clear") || c.includes("night")) return "🌙";
  if (c.includes("sunny") || c.includes("sun")) return "☀️";

  return "🌤️";
}

export function getParticles(condition = "") {
  const c = condition.toLowerCase();

  if (c.includes("rain") || c.includes("shower") || c.includes("drizzle")) return "rain";
  if (c.includes("snow") || c.includes("blizzard")) return "snow";
  if (c.includes("thunder")) return "storm";
  if (c.includes("sunny") || c.includes("clear")) return "sunny";

  return "none";
}