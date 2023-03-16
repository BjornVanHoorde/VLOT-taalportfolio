import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import useFetch from "../../../../../core/hooks/useFetch";
import Loading from "../../../../Design/Loading/Loading";
import TaalprofielOverview from "./TaalprofielOverview";

const TaalprofielLayout = ({ student }) => {
  const { onOtherLanguageChange } = useOutletContext();

  const {
    data: studentData,
    isLoading,
    invalidate,
  } = useFetch(`/students/name/${student.voornaam} ${student.achternaam}`);

  const { data: otherLanguages } = useFetch(
    `/andere-taal/leerling/${student.id}`
  );

  useEffect(() => {
    if (otherLanguages) {
      onOtherLanguageChange(otherLanguages);
    }
  }, [otherLanguages]);

  return (
    <>
      {isLoading && <Loading />}
      {studentData && (
        <TaalprofielOverview student={studentData[0]} onUpdate={invalidate} />
      )}
    </>
  );
};

export default TaalprofielLayout;
