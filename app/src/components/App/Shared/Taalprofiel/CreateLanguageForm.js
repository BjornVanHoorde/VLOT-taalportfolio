import Modal from "../../../Design/Modal/Modal";

const CreateLanguageForm = ({ onDismiss }) => {
  return (
    <Modal title="Nieuwe taal" onDismiss={onDismiss}>
      {/* {error && <Alert color="danger">{error}</Alert>} */}
      Hier komt de form
    </Modal>
  );
};

export default CreateLanguageForm;
