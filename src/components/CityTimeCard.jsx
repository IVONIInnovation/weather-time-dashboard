import React from 'react';
import Card from '../ui/card';
import { ChevronDown } from 'lucide-react';
import { getWeatherIcon } from '../utils/weatherUtils';
import HourlyWeather from './HourlyWeather';

const CityTimeCard = ({ 
  city, 
  timeZone, 
  weatherData, 
  showHourly, 
  onToggleHourly, 
  isEvening,
  currentTime,
  translations,
  language 
}) => {
  const currentTemp = weatherData?.[0]?.main?.temp;
  const weatherCondition = weatherData?.[0]?.weather?.[0]?.main;
  const Icon = getWeatherIcon(weatherCondition);

  return (
    <div className="flex flex-col">
      <Card className={`p-3 w-48 shadow-sm relative ${
        isEvening ? 'bg-slate-800 text-slate-200' : 'bg-white'
      }`}>
        <button 
          onClick={onToggleHourly}
          className={`absolute right-2 top-2 p-1 rounded-full transition-colors ${
            isEvening 
              ? 'hover:bg-slate-700 text-slate-400' 
              : 'hover:bg-slate-100 text-slate-500'
          }`}
        >
          <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${
            showHourly ? 'transform rotate-180' : ''
          }`} />
        </button>

        <div className={`border-b pb-2 mb-2 ${
          isEvening ? 'border-slate-700' : 'border-slate-100'
        }`}>
          <p className={`text-xs font-light ${
            isEvening ? 'text-slate-400' : 'text-slate-500'
          }`}>{city}</p>
          <div className="flex items-baseline">
            <p className="text-lg font-light">
              {currentTime.toLocaleTimeString('en-GB', { 
                timeZone,
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
            <p className={`ml-1 text-xs ${
              isEvening ? 'text-slate-500' : 'text-slate-400'
            }`}>
              {currentTime.toLocaleTimeString('en-GB', { 
                timeZone,
                second: '2-digit'
              })}
            </p>
          </div>
        </div>
        
        {weatherData && (
          <div className="flex justify-between text-xs">
            <div className="flex items-center">
              <Icon className={`w-3 h-3 mr-1 ${
                isEvening ? 'text-slate-500' : 'text-slate-400'
              }`} />
              <span>{Math.round(currentTemp)}°C</span>
            </div>
            <button
              onClick={onToggleHourly}
              className="text-xs hover:opacity-75"
            >
              {showHourly ? translations[language].hideForecast : translations[language].showForecast}
            </button>
          </div>
        )}
      </Card>
      
      {showHourly && weatherData && (
        <HourlyWeather 
          data={weatherData}
          isEvening={isEvening}
        />
      )}
    </div>
  );
};

export default CityTimeCard;
