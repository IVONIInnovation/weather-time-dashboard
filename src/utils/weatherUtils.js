import { Sun, CloudSun, Cloud, CloudRain, CloudLightning } from 'lucide-react';
import { API_KEY, CACHE_KEY, CACHE_TIMESTAMP_KEY, CACHE_DURATION } from './constants';

export const getWeatherIcon = (condition) => {
  if (!condition) return CloudSun;
  switch (condition.toLowerCase()) {
    case 'clear': return Sun;
    case 'clouds': return Cloud;
    case 'rain': return CloudRain;
    case 'thunderstorm': return CloudLightning;
    default: return CloudSun;
  }
};

export const loadWeatherData = async () => {
  try {
    const [barcelonaRes, yorkRes] = await Promise.all([
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Barcelona,ES&units=metric&appid=${API_KEY}`),
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=York,GB&units=metric&appid=${API_KEY}`)
    ]);

    const barcelonaData = await barcelonaRes.json();
    const yorkData = await yorkRes.json();

    return {
      barcelona: barcelonaData.list.slice(0, 24),
      york: yorkData.list.slice(0, 24)
    };
  } catch (err) {
    throw new Error('Failed to fetch weather data');
  }
};

export const checkWeatherCache = () => {
  const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
  if (cachedTimestamp && Date.now() - Number(cachedTimestamp) < CACHE_DURATION) {
    const cachedData = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (cachedData) {
      return cachedData;
    }
  }
  return null;
};

export const saveWeatherCache = (data) => {
  localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
};
