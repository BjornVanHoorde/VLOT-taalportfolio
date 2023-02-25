import { useState } from "react";

const useAlert = () => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message) => {
    setAlert({ message });

    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  const hideAlert = () => {
    setAlert(null);
  };

  return { alert, showAlert, hideAlert };
};

export default useAlert;
