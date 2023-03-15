import { useState } from "react";
import Languages from "../../../../../core/constants/Languages";
import TopNavLanguages from "../../../../../core/constants/TopNavLanguages";
import useFetch from "../../../../../core/hooks/useFetch";
import Button from "../../../../Design/Button/Button";
import LanguageButton from "../../../../Design/Button/LanguageButton";
import { useAuthContext } from "../../../Auth/AuthProvider";
import { useLanguageContext } from "../../../Language/LanguageProvider";
import CreateLanguageForm from "../../Taalprofiel/CreateLanguageForm";
import "./styles/topbar-student.css";

const TopNavStudent = ({ isTaalprofiel }) => {
  const { auth } = useAuthContext();
  const { currentLanguage, changeLanguage } = useLanguageContext();
  const [showModal, setShowModal] = useState(false);

  const { data: otherLanguages, invalidate } = useFetch(
    `/andere-talen/leerling/${auth.user.id}`
  );

console.log(window.location.pathname);

  const handleSuccess = () => {
    setShowModal(false);
    invalidate();
  };

  if (window.location.pathname === '/taalprofiel' || window.location.pathname === '/taalgroei/basisgeletterdheid') {
  return (
    <>
      <div className="top-nav-student">
        {TopNavLanguages.map((language) => (
          <LanguageButton
            label={language.label}
            key={language.label}
            activeLanguage={currentLanguage === language.label}
            onClick={() => changeLanguage(language.label)}
          />
        ))}
        {/* Show this only if the user is on the taalprofiel screen and if there are any other languages */}
        {isTaalprofiel &&
          otherLanguages?.length > 0 &&
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
            />
          ))}
        {/* Show this only if the user is on the taalprofiel screen */}
        {isTaalprofiel && (
          <Button label="+" onClick={() => setShowModal(true)} />
        )}
      </div>
      {/* Popup with the form to create a new language */}
      {showModal && (
        <CreateLanguageForm
          onSuccess={handleSuccess}
          onDismiss={() => setShowModal(false)}
        />
      )}
    </>
  );
}
};

export default TopNavStudent;
