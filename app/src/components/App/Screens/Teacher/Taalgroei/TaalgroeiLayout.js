import { useState } from "react";
import TaalgroeiNav from "../../../Shared/Generic/TaalgroeiNav/TaalgroeiNav";

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
    </>
  );
};

export default TaalgroeiLayout;
