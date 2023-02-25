import { createContext, useContext, useState } from "react";
import Languages from "../../../core/constants/Languages";

const LanguageContext = createContext();

const getLanguageFromStorage = () => {
  const language = localStorage.getItem("VLOT-language");
  if (language) {
    return language;
  }
  return Languages.Dutch;
};

const saveLanguageToStorage = (language) => {
  localStorage.setItem("VLOT-language", language);
};

const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(
    getLanguageFromStorage()
  );

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    saveLanguageToStorage(language);
  };

  return (
    <LanguageContext.Provider
      value={{ currentLanguage, changeLanguage: handleLanguageChange }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => {
  return useContext(LanguageContext);
};

export default LanguageProvider;
