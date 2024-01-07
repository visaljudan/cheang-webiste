import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get the language from local storage or default to 'en'
    return localStorage.getItem("language") || "en";
  });

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    // Save the language to local storage
    localStorage.setItem("language", newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "kh", name: "ភាសាខ្មែរ" },
  { code: "zh", name: "中国人" }, // Khmer
];
