import { useState } from "react";

// this hook will be used to show alerts
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
