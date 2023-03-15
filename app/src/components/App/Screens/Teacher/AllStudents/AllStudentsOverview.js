import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { MainNav } from "../../../../../core/constants/MainNav";
import { KlasRoutes, route } from "../../../../../core/routes";
import BackButton from "../../../../Design/Button/BackButton";
import Construction from "../../../../Design/Construction/Construction";
import TabNav from "../../../../Design/Nav/TabNav";
import ItemSidebar from "../../../Shared/Generic/ItemSidebar/ItemSidebar";
import ItemSidebarWithClassOption from "../../../Shared/Generic/ItemSidebar/ItemSidebarWithClassOption";
import TaalgroeiLayout from "../Taalgroei/TaalgroeiLayout";
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

  console.log(currentStudent);

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
        {currentTab === "Taalgroei" && (
          <ItemSidebarWithClassOption
            items={students}
            title="students"
            onChange={handleStudentChange}
            activeItem={currentStudent}
            klas={klas}
          />
        )}
        {currentTab !== "Taalgroei" && (
          <ItemSidebar
            items={students}
            title="students"
            onChange={handleStudentChange}
            activeItem={currentStudent}
          />
        )}
        {currentTab === "Taalprofiel" && currentStudent && (
          <TaalprofielLayout student={currentStudent} />
        )}
        {currentTab === "Taaldossier" && currentStudent && <Construction />}
        {currentTab === "Taalgroei" && currentStudent && (
          <TaalgroeiLayout student={currentStudent} klas={klas} />
        )}
      </div>
    </>
  );
};

export default AllStudentsOverview;
