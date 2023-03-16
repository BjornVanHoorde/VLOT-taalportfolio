import Languages from "../../../../../core/constants/Languages";
import TopNavLanguages from "../../../../../core/constants/TopNavLanguages";
import { isTeacher } from "../../../../../core/helpers/isRole";
import LanguageButton from "../../../../Design/Button/LanguageButton";
import { useAuthContext } from "../../../Auth/AuthProvider";
import { useLanguageContext } from "../../../Language/LanguageProvider";
import "./styles/topbar-teacher.css";

const TopNavTeacher = ({ otherLanguages }) => {
  const { auth } = useAuthContext();
  const { currentLanguage, changeLanguage } = useLanguageContext();

  return (
    <>
      <div className="top-nav-teacher">
        {TopNavLanguages.map((language) => (
          <LanguageButton
            label={language.label}
            key={language.label}
            activeLanguage={currentLanguage === language.label}
            onClick={() => changeLanguage(language.label)}
            isTeacher={isTeacher(auth)}
          />
        ))}
        {otherLanguages?.length > 0 &&
          otherLanguages.map((language) => (
            <LanguageButton
              key={language.id}
              label={language.taal}
              activeLanguage={
                currentLanguage === `${Languages.Other} ${language.taal}`
              }
              onClick={() =>
                changeLanguage(`${Languages.Other} ${language.taal}`)
              }
              isTeacher={isTeacher(auth)}
            />
          ))}
      </div>
    </>
  );
};

export default TopNavTeacher;
