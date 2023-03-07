import { useState } from "react";
import Languages from "../../../../../core/constants/Languages";
import TopNavLanguages from "../../../../../core/constants/TopNavLanguages";
import useFetch from "../../../../../core/hooks/useFetch";
import Button from "../../../../Design/Button/Button";
import LanguageButton from "../../../../Design/Button/LanguageButton";
import { useAuthContext } from "../../../Auth/AuthProvider";
import { useLanguageContext } from "../../../Language/LanguageProvider";
import CreateLanguageForm from "../../Taalprofiel/CreateLanguageForm";
import "./styles/topbar.css";

const TopNavStudent = ({ isTaalprofiel }) => {
  const { auth } = useAuthContext();
  const { currentLanguage, changeLanguage } = useLanguageContext();
  const [showModal, setShowModal] = useState(false);

  const { data: otherLanguages, invalidate } = useFetch(
    `/andere-talen/leerling/${auth.user.id}`
  );

  return (
    <>
      <div className="top-nav">
        {TopNavLanguages.map((language) => (
          <LanguageButton
            label={language.label}
            key={language.label}
            activeLanguage={currentLanguage === language.label}
            onClick={() => changeLanguage(language.label)}
          />
        ))}
        {isTaalprofiel &&
          otherLanguages?.length > 0 &&
          otherLanguages.map((language) => (
            <LanguageButton
              key={language.id}
              label={language.taal}
              activeLanguage={currentLanguage === Languages.Other}
              onClick={() => changeLanguage(Languages.Other)}
            />
          ))}
        {isTaalprofiel && (
          <Button label="+" onClick={() => setShowModal(true)} />
        )}
      </div>
      {showModal && (
        <CreateLanguageForm onDismiss={() => setShowModal(false)} />
      )}
    </>
  );
};

export default TopNavStudent;
