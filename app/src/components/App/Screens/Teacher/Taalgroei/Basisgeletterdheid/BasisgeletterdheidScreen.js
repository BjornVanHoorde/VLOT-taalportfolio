import useAlert from "../../../../../../core/hooks/useAlert";
import useMutation from "../../../../../../core/hooks/useMutation";
import Alert from "../../../../../Design/Alert/Alert";
import BasisgeletterdheidForm from "../../../../Shared/Taalgroei/Basisgeletterdheid/BasisgeletterheidForm";

const BasisgeletterdheidScreen = ({ data, onUpdate, klas }) => {
  const { isLoading, error, mutate } = useMutation();
  const { alert, showAlert, hideAlert } = useAlert();

  const handleSubmit = (values) => {
    for (const index in values) {
      mutate(
        `${process.env.REACT_APP_API_URL}/basisgeletterdheid/leerling/${index}`,
        {
          method: "PATCH",
          data: { status: values[index] === "true" ? true : false },
          onSuccess: () => {
            window.scrollTo(0, 0);
            showAlert("Basisgeletterdheden opgeslagen.");
            onUpdate();
          },
        }
      );
    }
  };

  return (
    <>
      {alert && (
        <div className="alert-list">
          <Alert message={alert.message} onClick={hideAlert} />
        </div>
      )}
      {data && (
        <BasisgeletterdheidForm
          klas={klas ? klas : null}
          data={data}
          onSubmit={handleSubmit}
          disabled={isLoading}
        />
      )}
    </>
  );
};

export default BasisgeletterdheidScreen;
