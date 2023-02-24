import { createContext, useContext, useState } from "react";
import Languages from "../../../core/constants/Languages";

const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(Languages.Dutch);

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
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
