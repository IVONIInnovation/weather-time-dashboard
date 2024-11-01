export const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
export const CACHE_KEY = 'weatherData';
export const CACHE_TIMESTAMP_KEY = 'weatherTimestamp';
export const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export const translations = {
  en: {
    greeting: isEvening => isEvening ? 'Good Evening' : 'Good Morning',
    date: 'Date',
    morning: 'Morning',
    evening: 'Evening',
    loadWeather: 'Load Weather',
    loading: 'Loading...',
    showForecast: 'Show forecast',
    hideForecast: 'Hide forecast',
    error: 'Failed to load weather data'
  },
  es: {
    greeting: isEvening => isEvening ? 'Buenas Noches' : 'Buenos Días',
    date: 'Fecha',
    morning: 'Mañana',
    evening: 'Noche',
    loadWeather: 'Cargar Tiempo',
    loading: 'Cargando...',
    showForecast: 'Ver previsión',
    hideForecast: 'Ocultar previsión',
    error: 'Error al cargar los datos'
  },
  ca: {
    greeting: isEvening => isEvening ? 'Bona Nit' : 'Bon Dia',
    date: 'Data',
    morning: 'Matí',
    evening: 'Nit',
    loadWeather: 'Carregar Temps',
    loading: 'Carregant...',
    showForecast: 'Veure previsió',
    hideForecast: 'Amagar previsió',
    error: 'Error en carregar dades'
  }
};
