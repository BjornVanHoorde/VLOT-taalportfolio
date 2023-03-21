import { useEffect } from "react";
import useAlert from "../../../../../core/hooks/useAlert";
import useFetch from "../../../../../core/hooks/useFetch";
import Alert from "../../../../Design/Alert/Alert";
import Loading from "../../../../Design/Loading/Loading";
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
  const { alert, showAlert, hideAlert } = useAlert();

  const handelUpdate = () => {
    invalidate();
    window.scrollTo(0, 0);
    showAlert("Basisgeletterdheden opgeslagen.");
  };

  useEffect(() => {
    invalidate();
  }, [student, klas]);

  return (
    <>
      {isLoading && <Loading />}
      {alert && (
        <div className="alert-list">
          <Alert message={alert.message} onClick={hideAlert} />
        </div>
      )}
      {statuses && (
        <BasisgeletterdheidScreen
          data={statuses}
          klas={klas ? klas : null}
          onUpdate={handelUpdate}
        />
      )}
    </>
  );
};

export default BasisGeletterdheidLayout;
