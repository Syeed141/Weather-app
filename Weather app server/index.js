const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// openAI integration 

// const OpenAI = require("openai");

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// app.post("/ai/weather-assistant", async (req, res) => {
//   const { mode, weather, location } = req.body;

//   if (!process.env.OPENAI_API_KEY) {
//     return res.status(500).json({
//       success: false,
//       error: "OpenAI API key not configured",
//     });
//   }

//   if (!mode || !weather) {
//     return res.status(400).json({
//       success: false,
//       error: "mode and weather are required",
//     });
//   }

//   let userPrompt = "";

//   if (mode === "summary") {
//     userPrompt = `
// You are a helpful weather assistant.

// Write a short, friendly weather summary in 2 sentences maximum.

// Location: ${location?.name || "Unknown"}, ${location?.country || ""}
// Temperature: ${weather.temp_c}°C
// Condition: ${weather.condition}
// Humidity: ${weather.humidity}%
// Wind: ${weather.wind_kph} kph
// Feels like: ${weather.feels_like_c}°C
// Visibility: ${weather.visibility_km} km
// UV Index: ${weather.uv}

// Keep it natural, useful, and concise.
// `;
//   } else if (mode === "activity") {
//     userPrompt = `
// You are a helpful weather assistant.

// Based on the weather, answer:
// "What should I do today?"

// Give a short practical answer in 3 bullet points:
// - outdoor advice
// - travel/umbrella advice
// - health/comfort advice

// Location: ${location?.name || "Unknown"}, ${location?.country || ""}
// Temperature: ${weather.temp_c}°C
// Condition: ${weather.condition}
// Humidity: ${weather.humidity}%
// Wind: ${weather.wind_kph} kph
// Feels like: ${weather.feels_like_c}°C
// Visibility: ${weather.visibility_km} km
// UV Index: ${weather.uv}
// `;
//   } else if (mode === "outfit") {
//     userPrompt = `
// You are a helpful weather assistant.

// Based on the weather, suggest what to wear today.

// Return:
// - top wear
// - bottom wear
// - footwear
// - extra item to carry

// Keep it short, practical, and modern.

// Location: ${location?.name || "Unknown"}, ${location?.country || ""}
// Temperature: ${weather.temp_c}°C
// Condition: ${weather.condition}
// Humidity: ${weather.humidity}%
// Wind: ${weather.wind_kph} kph
// Feels like: ${weather.feels_like_c}°C
// Visibility: ${weather.visibility_km} km
// UV Index: ${weather.uv}
// `;
//   } else {
//     return res.status(400).json({
//       success: false,
//       error: "Invalid mode",
//     });
//   }

//   try {
//     const response = await openai.responses.create({
//       model: "gpt-4.1-mini",
//       input: userPrompt,
//     });

//     res.json({
//       success: true,
//       result: response.output_text,
//     });
//   } catch (error) {
//     console.error("AI route error:", error);
//     res.status(500).json({
//       success: false,
//       error: "Failed to generate AI response",
//     });
//   }
// });








// GET /weather?city=Pabna
app.get("/weather", async (req, res) => {
  const city = req.query.city || "Pabna";
  const apiKey = process.env.WEATHER_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not configured" });
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ success: false, error: data.error?.message || "Failed to fetch weather data" });
    const { location, current } = data;
    res.json({
      success: true,
      location: { name: location.name, region: location.region, country: location.country, localtime: location.localtime },
      weather: { temp_c: current.temp_c, temp_f: current.temp_f, condition: current.condition.text, icon: "https:" + current.condition.icon, humidity: current.humidity, wind_kph: current.wind_kph, wind_dir: current.wind_dir, feels_like_c: current.feelslike_c, feels_like_f: current.feelslike_f, uv: current.uv, visibility_km: current.vis_km },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// update v2


// GET /weather/by-coords?lat=23.81&lon=90.41
app.get("/weather/by-coords", async (req, res) => {
  const { lat, lon } = req.query;
  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured" });
  }

  if (!lat || !lon) {
    return res.status(400).json({
      success: false,
      error: "Latitude and longitude are required",
    });
  }

  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: data.error?.message || "Failed to fetch weather data",
      });
    }

    const { location, current } = data;

    res.json({
      success: true,
      location: {
        name: location.name,
        region: location.region,
        country: location.country,
        localtime: location.localtime,
      },
      weather: {
        temp_c: current.temp_c,
        temp_f: current.temp_f,
        condition: current.condition.text,
        icon: "https:" + current.condition.icon,
        humidity: current.humidity,
        wind_kph: current.wind_kph,
        wind_dir: current.wind_dir,
        feels_like_c: current.feelslike_c,
        feels_like_f: current.feelslike_f,
        uv: current.uv,
        visibility_km: current.vis_km,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// GET /hourly/by-coords?lat=23.81&lon=90.41
app.get("/hourly/by-coords", async (req, res) => {
  const { lat, lon } = req.query;
  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured" });
  }

  if (!lat || !lon) {
    return res.status(400).json({
      success: false,
      error: "Latitude and longitude are required",
    });
  }

  try {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=2&aqi=no&alerts=no`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: data.error?.message || "Failed to fetch forecast",
      });
    }

    const allHours = [
      ...data.forecast.forecastday[0].hour,
      ...data.forecast.forecastday[1].hour,
    ];

    const nowEpoch = Math.floor(Date.now() / 1000);

    const next24 = allHours
      .filter((h) => h.time_epoch >= nowEpoch)
      .slice(0, 8)
      .map((h) => ({
        time: h.time.split(" ")[1],
        temp_c: h.temp_c,
        condition: h.condition.text,
        icon: "https:" + h.condition.icon,
        chance_of_rain: h.chance_of_rain,
        wind_kph: h.wind_kph,
      }));

    res.json({ success: true, hourly: next24 });
  } catch (error) {
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});








// GET /hourly?city=Pabna
app.get("/hourly", async (req, res) => {
  const city = req.query.city || "Pabna";
  const apiKey = process.env.WEATHER_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not configured" });
  try {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=2&aqi=no&alerts=no`;
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ success: false, error: data.error?.message || "Failed to fetch forecast" });
    const allHours = [...data.forecast.forecastday[0].hour, ...data.forecast.forecastday[1].hour];
    const nowEpoch = Math.floor(Date.now() / 1000);
    const next24 = allHours
      .filter(h => h.time_epoch >= nowEpoch)
      .slice(0, 8)
      .map(h => ({ time: h.time.split(" ")[1], temp_c: h.temp_c, condition: h.condition.text, icon: "https:" + h.condition.icon, chance_of_rain: h.chance_of_rain, wind_kph: h.wind_kph }));
    res.json({ success: true, hourly: next24 });
  } catch (error) {
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// POST /favorites/weather  body: { cities: ["Dhaka","London","Tokyo"] }
app.post("/favorites/weather", async (req, res) => {
  const { cities = [] } = req.body;
  const apiKey = process.env.WEATHER_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not configured" });
  if (!cities.length) return res.json({ success: true, results: [] });
  try {
    const results = await Promise.allSettled(
      cities.map(async (city) => {
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error?.message || "Not found");
        return { name: data.location.name, country: data.location.country, temp_c: data.current.temp_c, condition: data.current.condition.text, icon: "https:" + data.current.condition.icon, humidity: data.current.humidity, wind_kph: data.current.wind_kph };
      })
    );
    const weather = results.map((r, i) =>
      r.status === "fulfilled" ? { city: cities[i], ...r.value, error: null } : { city: cities[i], error: r.reason.message }
    );
    res.json({ success: true, results: weather });
  } catch (error) {
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

app.get("/", (req, res) => res.json({ status: "Weather API server running" }));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));