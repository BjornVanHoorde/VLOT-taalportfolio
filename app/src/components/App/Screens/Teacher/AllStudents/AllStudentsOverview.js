import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { MainNav } from "../../../../../core/constants/MainNav";
import { KlasRoutes, route } from "../../../../../core/routes";
import BackButton from "../../../../Design/Button/BackButton";
import TabNav from "../../../../Design/Nav/TabNav";
import ItemSidebar from "../../../Shared/Generic/ItemSidebar/ItemSidebar";
import TaalprofielLayout from "../Taalprofiel/TaalprofielLayout";
import "./styles/AllStudentsOverview.css";

const AllStudentsOverview = () => {
  const { klas, students } = useOutletContext();
  const [currentStudent, setCurrentStudent] = useState();
  const [currentTab, setCurrentTab] = useState();
  const navigate = useNavigate();

  const handleStudentChange = (student) => {
    setCurrentStudent(student);
  };

  const handleTabChange = (tab) => {
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
        />
        {currentTab === "Taalprofiel" && currentStudent && (
          <TaalprofielLayout student={currentStudent} />
        )}
        {currentTab === "Taaldossier" && currentStudent && (
          <p>Dit onderdeel is nog onder constructie</p>
        )}
        {currentTab === "Taalgroei" && currentStudent && (
          <p>Dit onderdeel is nog onder constructie</p>
        )}
      </div>
    </>
  );
};

export default AllStudentsOverview;
