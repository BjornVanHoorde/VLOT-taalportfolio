import Languages from "../../../../../core/constants/Languages";
import TopNavLanguages from "../../../../../core/constants/TopNavLanguages";
import { isTeacher } from "../../../../../core/helpers/isRole";
import LanguageButton from "../../../../Design/Button/LanguageButton";
import { useAuthContext } from "../../../Auth/AuthProvider";
import { useLanguageContext } from "../../../Language/LanguageProvider";
import { useLocation } from "react-router-dom";
import "./styles/topbar-teacher.css";
import { getKlasYear } from "../../../../../core/helpers/getYear";

const TopNavTeacher = ({ otherLanguages, basisgeletterdheid }) => {
  const { auth } = useAuthContext();
  const { currentLanguage, changeLanguage } = useLanguageContext();
  const location = useLocation();

  console.log(
    getKlasYear(
      location.pathname.split("/")[location.pathname.split("/").length - 1]
    )
  );

  if (basisgeletterdheid) {
    return (
      <>
        <div className="top-nav-teacher">
          {[{ label: "Nederlands" }].map((language) => (
            <LanguageButton
              label={language.label}
              key={language.label}
              activeLanguage={currentLanguage === language.label}
              onClick={() => changeLanguage(language.label)}
              isTeacher={isTeacher(auth)}
              klasYear={
                location.pathname === "/home"
                  ? 7
                  : getKlasYear(
                      location.pathname.split("/")[
                        location.pathname.split("/").length - 1
                      ]
                    )
              }
            />
          ))}
        </div>
      </>
    );
  }

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
            klasYear={
              location.pathname === "/home"
                ? 7
                : getKlasYear(
                    location.pathname.split("/")[
                      location.pathname.split("/").length - 1
                    ]
                  )
            }
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
