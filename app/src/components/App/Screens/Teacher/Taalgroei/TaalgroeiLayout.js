import { useState } from "react";
import Construction from "../../../../Design/Construction/Construction";
import TaalgroeiNav from "../../../Shared/Generic/TaalgroeiNav/TaalgroeiNav";
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
          currentTab !== "Basisgeletterdheid" ? "" : ""
        }`}
      >
        <TaalgroeiNav onClick={handleNavClick} currentTab={currentTab} />
        {currentTab !== "Basisgeletterdheid" && currentTab !== undefined && (
          <Construction />
        )}
      </div>
    </>
  );
};

export default TaalgroeiLayout;
