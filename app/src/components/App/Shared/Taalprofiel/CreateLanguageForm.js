import { useState } from "react";
import useMutation from "../../../../core/hooks/useMutation";
import Modal from "../../../Design/Modal/Modal";
import AndereTaalForm from "../AndereTaal/Form/AndereTaalForm";

const CreateLanguageForm = ({
  otherLanguage,
  onSuccess,
  onDismiss,
  disabled,
}) => {
  const { isLoading, error, mutate } = useMutation();
  // Check if the form is for updating or creating
  const [isUpdate] = useState(otherLanguage ? true : false);

  const handleSubmit = (values) => {
    mutate(
      `${process.env.REACT_APP_API_URL}/andere-talen${
        isUpdate ? `/${otherLanguage.id}` : ""
      }`,
      {
        method: isUpdate ? "PATCH" : "POST",
        data: values,
        onSuccess,
      }
    );
  };

  return (
    <>
      {/* based on the isUpdate state, we show a different title */}
      <Modal
        title={isUpdate ? "Taal bewerken" : "Nieuwe taal toevoegen"}
        onDismiss={onDismiss}
      >
        {error && <p>{error}</p>}
        {/* based on the isUpdate state, we show a different label and form */}
        <AndereTaalForm
          label={isUpdate ? "Bewerken" : "Toevoegen"}
          onSubmit={handleSubmit}
          initialData={otherLanguage}
          disabled={isLoading || disabled}
        />
      </Modal>
    </>
  );
};

export default CreateLanguageForm;
