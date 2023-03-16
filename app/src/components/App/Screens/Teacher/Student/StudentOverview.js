import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { MainNav } from "../../../../../core/constants/MainNav";
import { KlasRoutes, route } from "../../../../../core/routes";
import BackButton from "../../../../Design/Button/BackButton";
import Construction from "../../../../Design/Construction/Construction";
import TabNav from "../../../../Design/Nav/TabNav";
import TaalgroeiLayout from "../Taalgroei/TaalgroeiLayout";
import TaalprofielLayout from "../Taalprofiel/TaalprofielLayout";

const StudentOverview = () => {
  const { student, onOtherLanguageDismiss } = useOutletContext();
  const [currentTab, setCurrentTab] = useState();
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    if (tab !== "Taalprofiel") {
      onOtherLanguageDismiss();
    }
    setCurrentTab(tab);
  };

  return (
    <>
      <BackButton
        label={`${student.voornaam} ${student.achternaam}`}
        onClick={() =>
          navigate(route(KlasRoutes.Overview, { klas: student.klas.klas }))
        }
      />
      <TabNav
        items={MainNav}
        onChange={handleTabChange}
        activeTab={currentTab}
      />
      {student && currentTab === "Taalprofiel" && (
        <TaalprofielLayout student={student} />
      )}
      {currentTab === "Taaldossier" && <Construction />}
      {currentTab === "Taalgroei" && <TaalgroeiLayout student={student} />}
    </>
  );
};

export default StudentOverview;
