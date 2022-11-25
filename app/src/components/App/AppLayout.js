import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthRoutes } from "../../core/routes";
import { useAuthContext } from "./Auth/AuthProvider";

const AppLayout = () => {
  const { auth } = useAuthContext();
  const location = useLocation();

  if (auth) {
    return (
      <>
        <Outlet />
      </>
    );
  }

  return <Navigate to={AuthRoutes.Login} state={{ from: location }} replace />;
};

export default AppLayout;
