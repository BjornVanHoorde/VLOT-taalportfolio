import { useNavigate, useOutletContext } from "react-router-dom";
import { MainNav } from "../../../../../core/constants/MainNav";
import useFetch from "../../../../../core/hooks/useFetch";
import { KlasRoutes, route } from "../../../../../core/routes";
import BackButton from "../../../../Design/Button/BackButton";
import Loading from "../../../../Design/Loading/Loading";
import TabNav from "../../../../Design/Nav/TabNav";
import { useLanguageContext } from "../../../Language/LanguageProvider";
import { useYearContext } from "../../../Year/YearProvider";
import Overview from "./Overview";

const TaalprofielOverview = () => {
  const { student } = useOutletContext();
  const { currentLanguage } = useLanguageContext();
  const { selectedYear } = useYearContext();
  const navigate = useNavigate();

  const {
    data: answers,
    isLoading,
    invalidate,
  } = useFetch(
    `/taalprofiel/antwoorden/leerling/${`${student.voornaam} ${student.achternaam}`}/${currentLanguage}/${selectedYear}`
  );

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
      {isLoading && <Loading />}
      {answers && answers.length > 0 && (
        <Overview answers={answers} handleChange={invalidate} />
      )}
      {answers && answers.length === 0 && (
        <p>Er zijn nog geen antwoorden voor dit taalprofiel</p>
      )}
    </>
  );
};

export default TaalprofielOverview;
