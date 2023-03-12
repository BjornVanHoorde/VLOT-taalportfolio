import { Navigate } from "react-router-dom";
import { useAuthContext } from "./AuthProvider";

const RoleContainer = ({ roles = [], children }) => {
  const {
    auth: { user },
  } = useAuthContext();

  // redirect to home if the user has not the correct role
  if (!roles.includes(user.rol)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RoleContainer;
