# Skycast AI 🌤️  
**AI-powered weather app with real-time insights and dynamic UI**

Skycast AI is a full-stack weather application that transforms raw weather data into **actionable, AI-driven insights** with a modern, responsive interface.

Built with **React (Vite)** and **Node.js (Express)**.

---

## 🔗 Live Demo

👉 https://weather-app-delta-gray-67.vercel.app/

---

## 🚀 Features

- 🌍 **Real-time weather search** by city  
- 📍 **Current location weather** using geolocation  
- ⏱️ **Hourly forecast** (next 8 hours)  
- ⭐ **Favorite cities** with localStorage persistence  
- 🤖 **AI-powered insights**
  - Weather summaries  
  - Activity recommendations  
  - Outfit suggestions  
- 🎨 **Dynamic UI system**
  - Weather-based gradients & animations  
  - Glassmorphism design  
  - Fully responsive layout  

---

## 🧠 Tech Stack

| Category   | Technology |
|----------|----------|
| Frontend | React 19, Vite |
| Styling  | CSS, Animations, Glassmorphism |
| State Management | Custom React Hooks |
| AI Integration | Puter.js |
| Backend | Node.js, Express |
| API | WeatherAPI |
| Utilities | dotenv, CORS |

---

## 🏗️ Architecture

```text
Frontend (React)
   ↓
Express API (Node.js)
   ↓
WeatherAPI (external service)
Frontend → UI, state management, AI utilities
Backend → API layer, data fetching & processing
📁 Project Structure
.
├── Backend
│   ├── index.js
│   ├── package.json
│   └── .env
└── Frontend
    ├── src
    │   ├── components
    │   ├── hooks
    │   ├── utils
    │   └── styles
    ├── package.json
    └── .env


## 🔌 API Endpoints

| Method | Endpoint | Description |
|-------|--------|------------|
| GET | `/weather` | Fetch current weather by city |
| GET | `/weather/by-coords` | Fetch weather using latitude & longitude |
| GET | `/hourly` | Get hourly forecast data |
| GET | `/hourly/by-coords` | Get hourly forecast by coordinates |
| POST | `/favorites/weather` | Fetch weather for multiple cities |

---

## 💡 Highlights

- Full-stack architecture with clear separation of concerns  
- Reusable custom hooks for scalable state management  
- AI integrated into real application workflows  
- Dynamic UI that reacts to real-world weather conditions  
- Strong focus on both engineering quality and user experience  

---

## ⚡ Future Improvements

- 7-day forecast support  
- Server-side AI integration (OpenAI)  
- Authentication & cloud-synced favorites  
- Backend caching & rate limiting  
- Progressive Web App (PWA) support  

---

## 👤 Author

**Md. Shahriar Syeed**
