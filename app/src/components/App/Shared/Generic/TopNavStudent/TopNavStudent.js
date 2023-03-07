import { useState } from "react";
import TopNavLanguages from "../../../../../core/constants/TopNavLanguages";
import Button from "../../../../Design/Button/Button";
import LanguageButton from "../../../../Design/Button/LanguageButton";
import { useLanguageContext } from "../../../Language/LanguageProvider";
import CreateLanguageForm from "../../Taalprofiel/CreateLanguageForm";
import "./styles/topbar.css";

const TopNavStudent = ({ isTaalprofiel }) => {
  const { currentLanguage, changeLanguage } = useLanguageContext();
  const [showModal, setShowModal] = useState(false);

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
