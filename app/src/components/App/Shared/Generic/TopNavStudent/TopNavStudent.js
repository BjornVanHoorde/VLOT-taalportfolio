import TopNavLanguages from "../../../../../core/constants/TopNavLanguages";
import LanguageButton from "../../../../Design/Button/LanguageButton";
import { useLanguageContext } from "../../../Language/LanguageProvider";
import "./styles/topbar.css";

const TopNavStudent = () => {
  const { currentLanguage, changeLanguage } = useLanguageContext();

  return (
    <div className="top-nav">
      {TopNavLanguages.map((language) => (
        <LanguageButton
          label={language.label}
          key={language.label}
          activeLanguage={currentLanguage === language.label}
          onClick={() => changeLanguage(language.label)}
        />
      ))}
    </div>
  );
};

export default TopNavStudent;
