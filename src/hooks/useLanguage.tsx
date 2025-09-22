import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations, Language, TranslationKey } from '@/lib/translations';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: 'en',
  setLanguage: () => {},
  t: (key: TranslationKey) => key
});

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [isInitialized, setIsInitialized] = useState(false);

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem('preferred-language', lang);
  };

  const t = (key: TranslationKey): string => {
    return translations[currentLanguage]?.[key] || translations.en?.[key] || key;
  };

  // Load saved language on mount
  React.useEffect(() => {
    try {
      const savedLang = localStorage.getItem('preferred-language') as Language;
      if (savedLang && translations[savedLang]) {
        setCurrentLanguage(savedLang);
      }
    } catch (error) {
      console.warn('Failed to load saved language:', error);
    }
    setIsInitialized(true);
  }, []);

  const contextValue = React.useMemo(() => ({
    currentLanguage,
    setLanguage,
    t
  }), [currentLanguage]);

  if (!isInitialized) {
    return null;
  }

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  return context;
};