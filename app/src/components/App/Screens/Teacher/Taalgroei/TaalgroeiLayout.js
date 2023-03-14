import { useState } from "react";
import TaalgroeiNav from "../../../Shared/Generic/TaalgroeiNav/TaalgroeiNav";
import BasisGeletterdheidLayout from "./Basisgeletterdheid/BasisgeletterdheidLayout";

const TaalgroeiLayout = ({ student }) => {
  const [currentTab, setCurrentTab] = useState();

  const handleNavClick = (item) => {
    setCurrentTab(item);
  };

  return (
    <>
      <TaalgroeiNav onClick={handleNavClick} currentTab={currentTab} />
      {currentTab !== "Basisgeletterdheid" && currentTab !== undefined && (
        <p>🚧 Dit onderdeel is nog onder constructie 🚧</p>
      )}
      {currentTab === "Basisgeletterdheid" && (
        <BasisGeletterdheidLayout student={student} />
      )}
    </>
  );
};

export default TaalgroeiLayout;
