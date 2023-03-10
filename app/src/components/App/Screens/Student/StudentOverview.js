import { useNavigate, useOutletContext } from "react-router-dom";
import { MainNav } from "../../../../core/constants/MainNav";
import { KlasRoutes, route } from "../../../../core/routes";
import BackButton from "../../../Design/Button/BackButton";
import TabNav from "../../../Design/Nav/TabNav";

const StudentOverview = () => {
  const { student } = useOutletContext();
  const navigate = useNavigate();

  return (
    <>
      <BackButton
        label={`${student.voornaam} ${student.achternaam}`}
        onClick={() =>
          navigate(route(KlasRoutes.Overview, { klas: student.klas.klas }))
        }
      />
      <TabNav items={MainNav} />
    </>
  );
};

export default StudentOverview;
