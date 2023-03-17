import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "./AuthProvider";

const OnBoardingLayout = () => {
  const { auth } = useAuthContext();

  // redirect to page if already authenticated
  if (!auth) {
    return (
      <>
        <Outlet />
      </>
    );
  }

  return <Navigate to="/home" state={{ replace: true }} />;
};

export default OnBoardingLayout;
