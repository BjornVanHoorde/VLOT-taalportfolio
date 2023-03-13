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
  const navigate = useNavigate();

  const handleStudentChange = (student) => {
    setCurrentStudent(student);
  };

  return (
    <>
      <BackButton
        label={klas}
        onClick={() => navigate(route(KlasRoutes.Overview, { klas }))}
      />
      <TabNav items={MainNav} klas={klas} />
      <ItemSidebar
        items={students}
        title="students"
        onChange={handleStudentChange}
        activeItem={currentStudent}
      />
    </>
  );
};

export default AllStudentsOverview;
