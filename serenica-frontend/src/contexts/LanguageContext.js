import React, { createContext, useState, useContext, useEffect } from 'react';
import { supportedLanguages, defaultLanguage } from '../config/languages';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage);
  const [translations, setTranslations] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Load language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && supportedLanguages[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    } else {
      // Auto-detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (supportedLanguages[browserLang]) {
        setCurrentLanguage(browserLang);
      }
    }
  }, []);

  // Load translations
  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true);
      try {
        const module = await import(`../locales/${currentLanguage}.js`);
        setTranslations(module.default);
        
        // Update HTML direction for RTL languages
        document.documentElement.dir = supportedLanguages[currentLanguage].rtl ? 'rtl' : 'ltr';
        document.documentElement.lang = currentLanguage;
        
        // Save preference
        localStorage.setItem('preferredLanguage', currentLanguage);
      } catch (error) {
        console.warn(`Translations for ${currentLanguage} not found, falling back to English`);
        const fallback = await import('../locales/en.js');
        setTranslations(fallback.default);
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [currentLanguage]);

  const changeLanguage = (languageCode) => {
    if (supportedLanguages[languageCode]) {
      setCurrentLanguage(languageCode);
    }
  };

  const t = (key, fallback = '') => {
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) return fallback || key;
    }
    
    return value || fallback || key;
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    supportedLanguages,
    isLoading,
    isRTL: supportedLanguages[currentLanguage]?.rtl || false
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};