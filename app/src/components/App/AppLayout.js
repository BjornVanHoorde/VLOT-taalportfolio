import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isStudent, isTeacher } from "../../core/helpers/isRole";
import { AuthRoutes, TaalprofielRoutes } from "../../core/routes";
import { useAuthContext } from "./Auth/AuthProvider";
import Sidebar from "./Shared/Generic/Sidebar/Sidebar";
import TopNavStudent from "./Shared/Generic/TopNavStudent/TopNavStudent";
import TopNavTeacher from "./Shared/Generic/TopNavTeacher/TopNavTeacher";

const AppLayout = () => {
  const { auth } = useAuthContext();
  const location = useLocation();

  if (auth) {
    return (
      <>
        <Sidebar />
        <div id="main">
          {auth && isStudent(auth) && (
            <TopNavStudent
              isTaalprofiel={location.pathname.includes(
                TaalprofielRoutes.Index
              )}
            />
          )}
          {auth && isTeacher(auth) && <TopNavTeacher />}
          <Outlet />
        </div>
      </>
    );
  }

  return <Navigate to={AuthRoutes.Login} state={{ from: location }} replace />;
};

export default AppLayout;
