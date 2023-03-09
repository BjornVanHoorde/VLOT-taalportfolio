import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthRoutes, TaalprofielRoutes } from "../../core/routes";
import { useAuthContext } from "./Auth/AuthProvider";
import Sidebar from "./Shared/Generic/Sidebar/Sidebar";
import TopNavStudent from "./Shared/Generic/TopNavStudent/TopNavStudent";

const AppLayout = () => {
  const { auth } = useAuthContext();
  const location = useLocation();

  if (auth) {
    return (
      <>
        <Sidebar />
        <div id="main">
          <TopNavStudent
            isTaalprofiel={location.pathname.includes(TaalprofielRoutes.Index)}
          />
          <Outlet />
        </div>
      </>
    );
  }

  return <Navigate to={AuthRoutes.Login} state={{ from: location }} replace />;
};

export default AppLayout;
