import puter from "@heyputer/puter.js";

export async function getWeatherSummary({ location, weather }) {
  const prompt = `
You are a helpful weather assistant.

Write a short, friendly weather summary in no more than 2 sentences.

Location: ${location?.name || "Unknown"}, ${location?.country || ""}
Temperature: ${weather?.temp_c}°C
Condition: ${weather?.condition}
Humidity: ${weather?.humidity}%
Wind: ${weather?.wind_kph} kph
Feels like: ${weather?.feels_like_c}°C
Visibility: ${weather?.visibility_km} km
UV Index: ${weather?.uv}

Keep it concise, useful, and natural.
`;

  const result = await puter.ai.chat(prompt);
  return extractText(result);
}

export async function getActivityAdvice({ location, weather }) {
  const prompt = `
You are a weather assistant.

Return ONLY valid JSON (no explanation).

Format:
{
  "outdoor": "...",
  "travel": "...",
  "health": "..."
}

Weather:
Location: ${location?.name}, ${location?.country}
Temperature: ${weather?.temp_c}°C
Condition: ${weather?.condition}
Humidity: ${weather?.humidity}%
`;

  const result = await puter.ai.chat(prompt);
  return extractJSON(result);
}

export async function getOutfitSuggestion({ location, weather }) {
  const prompt = `
You are a weather assistant.

Return ONLY valid JSON (no explanation).

Format:
{
  "top": "...",
  "bottom": "...",
  "footwear": "...",
  "extra": "..."
}

Weather:
Location: ${location?.name}, ${location?.country}
Temperature: ${weather?.temp_c}°C
Condition: ${weather?.condition}
Humidity: ${weather?.humidity}%
`;

  const result = await puter.ai.chat(prompt);
  return extractJSON(result);
}

function extractText(result) {
  if (typeof result === "string") return result;
  if (result?.message?.content) return result.message.content;
  if (result?.text) return result.text;
  return "AI response unavailable right now.";
}


function extractJSON(result) {
  try {
    const text =
      typeof result === "string"
        ? result
        : result?.message?.content || result?.text || "";

    return JSON.parse(text);
  } catch {
    return null;
  }
}