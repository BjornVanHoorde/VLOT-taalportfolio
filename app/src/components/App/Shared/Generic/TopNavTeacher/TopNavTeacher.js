import TopNavLanguages from "../../../../../core/constants/TopNavLanguages";
import LanguageButton from "../../../../Design/Button/LanguageButton";
import { useAuthContext } from "../../../Auth/AuthProvider";
import { useLanguageContext } from "../../../Language/LanguageProvider";
import "./styles/topbar.css";

const TopNavTeacher = () => {
  const { auth } = useAuthContext();
  const { currentLanguage, changeLanguage } = useLanguageContext();

  return (
    <>
      <div className="top-nav">
        {TopNavLanguages.map((language) => (
          <LanguageButton
            label={language.label}
            key={language.label}
            activeLanguage={currentLanguage === language.label}
            onClick={() => changeLanguage(language.label)}
            isTeacher={true}
          />
        ))}
      </div>
    </>
  );
};

export default TopNavTeacher;
