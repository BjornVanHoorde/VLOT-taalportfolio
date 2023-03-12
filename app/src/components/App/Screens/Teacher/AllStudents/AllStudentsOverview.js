import { useNavigate, useOutletContext } from "react-router-dom";
import { MainNav } from "../../../../../core/constants/MainNav";
import { KlasRoutes, route } from "../../../../../core/routes";
import BackButton from "../../../../Design/Button/BackButton";
import TabNav from "../../../../Design/Nav/TabNav";

const AllStudentsOverview = () => {
  const { klas, students } = useOutletContext();
  const navigate = useNavigate();

  return (
    <>
      <BackButton
        label={klas}
        onClick={() => navigate(route(KlasRoutes.Overview, { klas }))}
      />
      <TabNav items={MainNav} klas={klas} />
    </>
  );
};

export default AllStudentsOverview;
