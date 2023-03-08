import { useEffect } from "react";
import useMutation from "../../../../core/hooks/useMutation";
import Button from "../../../Design/Button/Button";

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

  return <Button label={label} onClick={handleClick} />;
};

export default DeleteButton;
