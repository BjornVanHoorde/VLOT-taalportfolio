import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "./AuthProvider";

const OnBoardingLayout = () => {
  const { auth } = useAuthContext();
  const location = useLocation();

  if (!auth) {
    return (
      <>
        <Outlet />
      </>
    );
  }

  const from = location.state?.from?.pathname || "/";

  return <Navigate to={from} state={{ replace: true }} />;
};

export default OnBoardingLayout;
