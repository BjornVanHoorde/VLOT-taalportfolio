import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthRoutes } from "../../core/routes";
import { useAuthContext } from "./Auth/AuthProvider";
import StdSidebar from "./Shared/Generic/Sidebar/Sidebar";
import TopNavStudent from "./Shared/Generic/TopNavStudent/TopNavStudent";

const AppLayout = () => {
  const { auth } = useAuthContext();
  const location = useLocation();

  // if (auth)
   // {
    return (
      <>
        <StdSidebar />
        <div id="main">
        <TopNavStudent />
        <Outlet />
        </div>
      </>
    );
  // }

  return <Navigate to={AuthRoutes.Login} state={{ from: location }} replace />;
};

export default AppLayout;
