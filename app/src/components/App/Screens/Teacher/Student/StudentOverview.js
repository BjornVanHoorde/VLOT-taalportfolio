import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { MainNav } from "../../../../../core/constants/MainNav";
import { KlasRoutes, route } from "../../../../../core/routes";
import BackButton from "../../../../Design/Button/BackButton";
import TabNav from "../../../../Design/Nav/TabNav";
import TaalprofielLayout from "../Taalprofiel/TaalprofielLayout";

const StudentOverview = () => {
  const { student } = useOutletContext();
  const [currentTab, setCurrentTab] = useState();
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
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
      {currentTab === "Taaldossier" && (
        <p>Dit onderdeel is nog onder constructie</p>
      )}
      {currentTab === "Taalgroei" && (
        <p>Dit onderdeel is nog onder constructie</p>
      )}
    </>
  );
};

export default StudentOverview;
