import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Languages from "../../../../../core/constants/Languages";
import { MainNav } from "../../../../../core/constants/MainNav";
import { KlasRoutes, route } from "../../../../../core/routes";
import BackButton from "../../../../Design/Button/BackButton";
import Construction from "../../../../Design/Construction/Construction";
import TabNav from "../../../../Design/Nav/TabNav";
import { useLanguageContext } from "../../../Language/LanguageProvider";
import ItemSidebar from "../../../Shared/Generic/ItemSidebar/ItemSidebar";
import BasisGeletterdheidLayout from "../Basisgeletterdheid/BasisgeletterdheidLayout";
import TaalgroeiLayout from "../Taalgroei/TaalgroeiLayout";
import TaalprofielLayout from "../Taalprofiel/TaalprofielLayout";
import "./styles/AllStudentsOverview.css";

const AllStudentsOverview = () => {
  const {
    klas,
    students,
    onOtherLanguageDismiss,
    onBasisgeletterdheid,
    onBasisgeletterdheidDismiss,
  } = useOutletContext();
  const { currentLanguage, changeLanguage } = useLanguageContext();
  const [currentStudent, setCurrentStudent] = useState();
  const [currentTab, setCurrentTab] = useState();
  const navigate = useNavigate();

  const handleStudentChange = (student) => {
    if (currentLanguage.split(" ")[0] === Languages.Other) {
      changeLanguage(Languages.Dutch);
    }
    if (typeof student.id === "string") {
      onOtherLanguageDismiss();
    }
    setCurrentStudent(student);
  };

  const handleTabChange = (tab) => {
    if (tab !== "Taalprofiel") {
      onOtherLanguageDismiss();
    }
    if (tab === "Basisgeletterdheid") {
      onBasisgeletterdheid();
    }
    if (tab !== "Basisgeletterdheid") {
      onBasisgeletterdheidDismiss();
    }
    setCurrentTab(tab);
  };

  return (
    <>
      <BackButton
        label={klas}
        onClick={() => navigate(route(KlasRoutes.Overview, { klas }))}
      />
      <TabNav
        items={MainNav}
        onChange={handleTabChange}
        activeTab={currentTab}
      />
      <div className="allStudentsOverview__main">
        <div className="allStudentsOverview__main__spaceHelper"></div>
        <ItemSidebar
          items={students}
          title="students"
          onChange={handleStudentChange}
          activeItem={currentStudent}
          klas={klas}
        />
        {currentTab === "Taalprofiel" && currentStudent && (
          <TaalprofielLayout
            student={
              typeof currentStudent.id === "number" ? currentStudent : null
            }
            klas={typeof currentStudent.id === "string" ? klas : null}
          />
        )}
        {currentTab === "Taaldossier" && currentStudent && <Construction />}
        {currentTab === "Taalgroei" && currentStudent && (
          <TaalgroeiLayout student={currentStudent} klas={klas} />
        )}
        {currentTab === "Basisgeletterdheid" && currentStudent && (
          <BasisGeletterdheidLayout
            student={
              typeof currentStudent.id === "number" ? currentStudent : null
            }
            klas={typeof currentStudent.id === "string" ? klas : null}
          />
        )}
      </div>
    </>
  );
};

export default AllStudentsOverview;
