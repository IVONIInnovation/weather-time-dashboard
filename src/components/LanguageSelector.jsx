import React from 'react';

const LanguageSelector = ({ language, setLanguage, isEvening }) => (
  <div className={`flex gap-1 text-[10px] font-light ${
    isEvening ? 'text-slate-400' : 'text-slate-500'
  }`}>
    <button 
      onClick={() => setLanguage('en')}
      className={`px-1.5 py-0.5 rounded transition-colors ${
        language === 'en' 
          ? isEvening 
            ? 'bg-slate-700 text-slate-200' 
            : 'bg-slate-100 text-slate-700'
          : 'hover:opacity-75'
      }`}
    >
      EN
    </button>
    <button 
      onClick={() => setLanguage('es')}
      className={`px-1.5 py-0.5 rounded transition-colors ${
        language === 'es'
          ? isEvening 
            ? 'bg-slate-700 text-slate-200' 
            : 'bg-slate-100 text-slate-700'
          : 'hover:opacity-75'
      }`}
    >
      ES
    </button>
    <button 
      onClick={() => setLanguage('ca')}
      className={`px-1.5 py-0.5 rounded transition-colors ${
        language === 'ca'
          ? isEvening 
            ? 'bg-slate-700 text-slate-200' 
            : 'bg-slate-100 text-slate-700'
          : 'hover:opacity-75'
      }`}
    >
      CA
    </button>
  </div>
);

export default LanguageSelector;
