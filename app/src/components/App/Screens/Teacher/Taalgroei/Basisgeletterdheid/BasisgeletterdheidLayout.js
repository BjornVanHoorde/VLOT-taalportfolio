import useFetch from "../../../../../../core/hooks/useFetch";
import Loading from "../../../../../Design/Loading/Loading";
import BasisgeletterdheidScreen from "./BasisgeletterdheidScreen";

const BasisGeletterdheidLayout = ({ student, klas }) => {
  const {
    data: statuses,
    isLoading,
    invalidate,
  } = useFetch(
    student
      ? `/basisgeletterdheid/leerling/${student.id}`
      : klas
      ? `/basisgeletterdheid/klas/${klas}`
      : null
  );

  return (
    <>
      {isLoading && <Loading />}
      {statuses && (
        <BasisgeletterdheidScreen
          data={statuses}
          klas={klas ? klas : null}
          onUpdate={invalidate}
        />
      )}
    </>
  );
};

export default BasisGeletterdheidLayout;
