import { useState } from "react";
import TaalgroeiNav from "../../../Shared/Generic/TaalgroeiNav/TaalgroeiNav";
import BasisGeletterdheidLayout from "./Basisgeletterdheid/BasisgeletterdheidLayout";

const TaalgroeiLayout = ({ student, klas }) => {
  const [currentTab, setCurrentTab] = useState();

  const handleNavClick = (item) => {
    setCurrentTab(item);
  };

  return (
    <>
      <div className="taalgroei__layout">
        <TaalgroeiNav onClick={handleNavClick} currentTab={currentTab} />
        {currentTab !== "Basisgeletterdheid" && currentTab !== undefined && (
          <p>🚧 Dit onderdeel is nog onder constructie 🚧</p>
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
