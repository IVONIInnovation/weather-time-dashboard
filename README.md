# Weather & Time Dashboard

A React-based dashboard showing time and weather for Barcelona and York, with support for English, Spanish, and Catalan.

## Setup

1. Install dependencies:
```bash
npm install lucide-react @radix-ui/react-slot
```

2. Add your OpenWeatherMap API key:
- Go to `src/utils/constants.js`
- Replace `'YOUR_API_KEY'` with your key from [OpenWeatherMap](https://openweathermap.org/api)

## Features

- Real-time clock with seconds
- Weather updates with 24-hour forecast
- Dark/light mode based on time of day
- Multi-language support (EN/ES/CA)
- Touch-friendly scrolling
- Weather data caching

## File Structure

```
src/
├── components/
│   ├── TimeWeatherApp.jsx   (main component)
│   ├── CityTimeCard.jsx     (city card with time & weather)
│   ├── HourlyWeather.jsx    (hourly forecast display)
│   └── LanguageSelector.jsx (language switcher)
└── utils/
    ├── constants.js         (API keys, translations)
    └── weatherUtils.js      (weather helpers)
```
