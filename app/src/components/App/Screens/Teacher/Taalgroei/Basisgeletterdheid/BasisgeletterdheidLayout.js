import useFetch from "../../../../../../core/hooks/useFetch";
import Loading from "../../../../../Design/Loading/Loading";
import BasisgeletterdheidScreen from "./BasisgeletterdheidScreen";

const BasisGeletterdheidLayout = ({ student }) => {
  const {
    data: statuses,
    isLoading,
    invalidate,
  } = useFetch(`/basisgeletterdheid/leerling/${student.id}`);

  return (
    <>
      {isLoading && <Loading />}
      {statuses && (
        <BasisgeletterdheidScreen data={statuses} onUpdate={invalidate} />
      )}
    </>
  );
};

export default BasisGeletterdheidLayout;
