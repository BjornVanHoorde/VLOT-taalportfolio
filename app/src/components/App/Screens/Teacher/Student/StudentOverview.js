import { useNavigate, useOutletContext } from "react-router-dom";
import { MainNav } from "../../../../../core/constants/MainNav";
import useFetch from "../../../../../core/hooks/useFetch";
import { KlasRoutes, route } from "../../../../../core/routes";
import BackButton from "../../../../Design/Button/BackButton";
import TabNav from "../../../../Design/Nav/TabNav";
import { useLanguageContext } from "../../../Language/LanguageProvider";
import { useYearContext } from "../../../Year/YearProvider";

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
      <TabNav
        items={MainNav}
        student={`${student.voornaam} ${student.achternaam}`}
      />
    </>
  );
};

export default StudentOverview;
