import { useEffect } from "react";
import useMutation from "../../../../core/hooks/useMutation";
import Button from "../../../Design/Button/Button";
import "./styles/DeleteButton.css";

// This is a button that will delete a resource
const DeleteButton = ({ label, onSuccess, id, scope, disabled, ...rest }) => {
  const { isLoading, error, mutate } = useMutation();

  const handleClick = () => {
    mutate(`${process.env.REACT_APP_API_URL}/${scope}/${id}`, {
      method: "DELETE",
      onSuccess: () => {
        onSuccess();
      },
    });
  };

  useEffect(() => {
    if (error) {
      window.alert(error);
    }
  }, [error]);

  return <Button className="deleteBtn" label={label} onClick={handleClick} />;
};

export default DeleteButton;
