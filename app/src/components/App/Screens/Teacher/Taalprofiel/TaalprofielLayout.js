import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import useFetch from "../../../../../core/hooks/useFetch";
import Loading from "../../../../Design/Loading/Loading";
import TaalprofielOverview from "./TaalprofielOverview";

const TaalprofielLayout = ({ student, klas }) => {
  const { onOtherLanguageChange } = useOutletContext();

  const {
    data: studentData,
    isLoading,
    invalidate,
  } = useFetch(
    student ? `/students/name/${student.voornaam} ${student.achternaam}` : null
  );

  const { data: otherLanguages } = useFetch(
    student && `/andere-taal/leerling/${student.id}`
  );

  useEffect(() => {
    if (otherLanguages) {
      onOtherLanguageChange(otherLanguages);
    }
  }, [otherLanguages]);

  useEffect(() => {
    invalidate();
  }, [student, klas]);

  return (
    <>
      {isLoading && <Loading />}
      {(studentData || klas) && (
        <TaalprofielOverview
          student={student ? studentData[0] : null}
          onUpdate={invalidate}
          klas={klas ? klas : null}
        />
      )}
    </>
  );
};

export default TaalprofielLayout;
