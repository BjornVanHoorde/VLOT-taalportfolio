import { useEffect, useState } from "react";
import useMutation from "../../../../core/hooks/useMutation";
import Modal from "../../../Design/Modal/Modal";
import AndereTaalForm from "../AndereTaal/Form/AndereTaalForm";

const CreateLanguageForm = ({ otherLanguage, onSuccess, onDismiss }) => {
  const { isLoading, error, mutate } = useMutation();
  const [isUpdate, setIsUpdate] = useState(otherLanguage ? true : false);

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
    <Modal
      title={isUpdate ? "Taal bewerken" : "Nieuwe taal toevoegen"}
      onDismiss={onDismiss}
    >
      {error && <p>{error}</p>}
      <AndereTaalForm
        label={isUpdate ? "Bewerken" : "Toevoegen"}
        onSubmit={handleSubmit}
        initialData={otherLanguage}
        disabled={isLoading}
      />
    </Modal>
  );
};

export default CreateLanguageForm;
