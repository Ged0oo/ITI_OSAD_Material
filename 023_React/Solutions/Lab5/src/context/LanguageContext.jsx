import { createContext, useState } from "react";
import translations from "../translations/translations";

const LanguageContext = createContext();

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  const trans = translations[language];

  const rtl = language === "ar";

  return (
    <LanguageContext.Provider value={{ toggleLanguage, trans, rtl }}>
      {children}
    </LanguageContext.Provider>
  );
}

export { LanguageProvider, LanguageContext };
