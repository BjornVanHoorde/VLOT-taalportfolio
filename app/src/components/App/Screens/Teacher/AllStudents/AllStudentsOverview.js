import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { MainNav } from "../../../../../core/constants/MainNav";
import { KlasRoutes, route } from "../../../../../core/routes";
import BackButton from "../../../../Design/Button/BackButton";
import TabNav from "../../../../Design/Nav/TabNav";
import ItemSidebar from "../../../Shared/Generic/ItemSidebar/ItemSidebar";

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
      <ItemSidebar
        items={students}
        title="students"
        onChange={handleStudentChange}
        activeItem={currentStudent}
      />
      {currentTab && currentStudent && <p>"test"</p>}
    </>
  );
};

export default AllStudentsOverview;
