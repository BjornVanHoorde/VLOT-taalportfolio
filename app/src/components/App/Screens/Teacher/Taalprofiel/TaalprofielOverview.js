import { useEffect } from "react";
import useFetch from "../../../../../core/hooks/useFetch";
import Loading from "../../../../Design/Loading/Loading";
import { useLanguageContext } from "../../../Language/LanguageProvider";
import { useYearContext } from "../../../Year/YearProvider";
import Overview from "./Overview";

const TaalprofielOverview = ({ student, onUpdate }) => {
  const { currentLanguage } = useLanguageContext();
  const { selectedYear } = useYearContext();

  const {
    data: answers,
    isLoading,
    invalidate,
  } = useFetch(
    `/taalprofiel/antwoorden/leerling/${`${student.voornaam} ${student.achternaam}`}/${
      currentLanguage.split(" ")[0]
    }/${selectedYear}`
  );

  useEffect(() => {
    invalidate();
  }, [currentLanguage, selectedYear]);

  return (
    <>
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
