import React, { useState, useEffect } from 'react';
import { Sun, Moon, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import CityTimeCard from './CityTimeCard';
import LanguageSelector from './LanguageSelector';
import { translations, CACHE_KEY, CACHE_TIMESTAMP_KEY } from '../utils/constants';
import { loadWeatherData, checkWeatherCache, saveWeatherCache } from '../utils/weatherUtils';

const TimeWeatherApp = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [language, setLanguage] = useState('en');
  const [hourlyWeather, setHourlyWeather] = useState({
    barcelona: [],
    york: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showBarcelonaHourly, setShowBarcelonaHourly] = useState(false);
  const [showYorkHourly, setShowYorkHourly] = useState(false);

  const isEvening = currentTime.getHours() >= 18 || currentTime.getHours() < 6;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const cachedData = checkWeatherCache();
    if (cachedData) {
      setHourlyWeather(cachedData);
    }

    return () => clearInterval(timer);
  }, []);

  const handleLoadWeather = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const weatherData = await loadWeatherData();
      setHourlyWeather(weatherData);
      saveWeatherCache(weatherData);
    } catch (err) {
      setError(translations[language].error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${
      isEvening 
        ? 'bg-slate-900 text-slate-200' 
        : 'bg-white text-slate-700'
    }`}>
      <div className="flex flex-col items-center space-y-4">
        {/* Header with Sun/Moon and Greeting */}
        <div className="flex flex-col items-center space-y-1">
          {isEvening ? (
            <Moon className="w-8 h-8 text-amber-200" />
          ) : (
            <Sun className="w-8 h-8 text-amber-300" />
          )}
          <h1 className={`text-xl font-light ${
            isEvening ? 'text-slate-200' : 'text-slate-600'
          }`}>{translations[language].greeting(isEvening)}</h1>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <LanguageSelector 
            language={language}
            setLanguage={setLanguage}
            isEvening={isEvening}
          />
          <button
            onClick={handleLoadWeather}
            disabled={isLoading}
            className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] transition-colors ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-75'
            } ${
              isEvening 
                ? 'bg-slate-700 text-slate-200' 
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? translations[language].loading : translations[language].loadWeather}
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <p className="text-[10px] text-red-500">{error}</p>
        )}

        {/* Date Card */}
        <Card className={`p-3 w-48 text-center shadow-sm ${
          isEvening ? 'bg-slate-800 text-slate-200' : 'bg-white'
        }`}>
          <p className={`text-xs uppercase tracking-wide ${
            isEvening ? 'text-slate-400' : 'text-slate-500'
          }`}>{translations[language].date}</p>
          <p className="text-sm font-light">
            {currentTime.toLocaleDateString(language === 'en' ? 'en-GB' : 'es-ES')}
          </p>
        </Card>

        {/* City Cards */}
        <div className="space-y-3">
          <CityTimeCard 
            city="Barcelona" 
            timeZone="Europe/Madrid"
            weatherData={hourlyWeather.barcelona}
            showHourly={showBarcelonaHourly}
            onToggleHourly={() => setShowBarcelonaHourly(!showBarcelonaHourly)}
            isEvening={isEvening}
            currentTime={currentTime}
            translations={translations}
            language={language}
          />
          <CityTimeCard 
            city="York" 
            timeZone="Europe/London"
            weatherData={hourlyWeather.york}
            showHourly={showYorkHourly}
            onToggleHourly={() => setShowYorkHourly(!showYorkHourly)}
            isEvening={isEvening}
            currentTime={currentTime}
            translations={translations}
            language={language}
          />
        </div>
      </div>
    </div>
  );
};

export default TimeWeatherApp;
