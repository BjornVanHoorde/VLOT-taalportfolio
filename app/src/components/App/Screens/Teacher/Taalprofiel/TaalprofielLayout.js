import useFetch from "../../../../../core/hooks/useFetch";
import Loading from "../../../../Design/Loading/Loading";
import TaalprofielOverview from "./TaalprofielOverview";

const TaalprofielLayout = ({ student }) => {
  const {
    data: studentData,
    isLoading,
    invalidate,
  } = useFetch(`/students/name/${student.voornaam} ${student.achternaam}`);

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
