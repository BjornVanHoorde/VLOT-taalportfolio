import useMutation from "../../../../../../core/hooks/useMutation";
import BasisgeletterdheidForm from "../../../../Shared/Taalgroei/Basisgeletterdheid/BasisgeletterheidForm";

const BasisgeletterdheidScreen = ({ data, onUpdate }) => {
  const { isLoading, error, mutate } = useMutation();
  // /basisgeletterdheid/leerling/:id

  const handleSubmit = (values) => {
    for (const index in values) {
      mutate(
        `${process.env.REACT_APP_API_URL}/basisgeletterdheid/leerling/${index}`,
        {
          method: "PATCH",
          data: { status: values[index] === "true" ? true : false },
          onSuccess: () => {
            onUpdate();
          },
        }
      );
    }
  };

  return (
    <>
      {data && <BasisgeletterdheidForm data={data} onSubmit={handleSubmit} />}
    </>
  );
};

export default BasisgeletterdheidScreen;
