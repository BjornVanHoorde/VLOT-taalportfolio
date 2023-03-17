import { useState } from "react";
import Construction from "../../../../Design/Construction/Construction";
import TaalgroeiNav from "../../../Shared/Generic/TaalgroeiNav/TaalgroeiNav";
import BasisGeletterdheidLayout from "./Basisgeletterdheid/BasisgeletterdheidLayout";
import "../Taalgroei/styles/taalgroeiLayout.css";

const TaalgroeiLayout = ({ student, klas }) => {
  const [currentTab, setCurrentTab] = useState();

  const handleNavClick = (item) => {
    setCurrentTab(item);
  };

  return (
    <>
      <div
        className={`taalgroei__layout ${
          currentTab !== "Basisgeletterdheid" ? "full-width" : ""
        }`}
      >
        <TaalgroeiNav onClick={handleNavClick} currentTab={currentTab} />
        {currentTab !== "Basisgeletterdheid" && currentTab !== undefined && (
          <Construction />
        )}
        {currentTab === "Basisgeletterdheid" && student.id !== klas && (
          <BasisGeletterdheidLayout student={student} />
        )}
        {currentTab === "Basisgeletterdheid" && student.id === klas && (
          <BasisGeletterdheidLayout klas={klas} />
        )}
      </div>
    </>
  );
};

export default TaalgroeiLayout;
