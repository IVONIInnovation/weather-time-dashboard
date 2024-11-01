import React from 'react';
import { Card } from '@/components/ui/card';
import { getWeatherIcon } from '../utils/weatherUtils';

const HourlyWeather = ({ data, isEvening }) => (
  <Card className={`mt-2 p-1 shadow-lg w-48 transition-all duration-300 ${
    isEvening ? 'bg-slate-800' : 'bg-white'
  }`}>
    <div className="overflow-x-auto touch-pan-x scrollbar-none">
      <div className="flex py-0.5 px-0.5 select-none">
        {data.map((hour, index) => {
          const Icon = getWeatherIcon(hour.weather?.[0]?.main);
          const temp = Math.round(hour.main?.temp || 0);
          const hourTime = new Date(hour.dt * 1000).getHours();
          
          return (
            <React.Fragment key={hour.dt}>
              <div className="flex flex-col items-center justify-center min-w-[1.5rem] py-0.5">
                <Icon className={`w-2.5 h-2.5 opacity-50 mb-0.5 ${
                  isEvening ? 'text-slate-300' : 'text-slate-600'
                }`} />
                <span className={`text-[9px] font-medium leading-none mb-0.5 ${
                  isEvening ? 'text-slate-200' : 'text-slate-700'
                }`}>
                  {temp}°
                </span>
                <span className={`text-[7px] leading-none ${
                  isEvening ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  {hourTime.toString().padStart(2, '0')}h
                </span>
              </div>
              {index < data.length - 1 && (
                <div className={`self-stretch my-1 ${
                  isEvening ? 'bg-slate-600' : 'bg-slate-200'
                } w-px opacity-15`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  </Card>
);

export default HourlyWeather;
