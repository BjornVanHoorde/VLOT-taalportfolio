import { useEffect, useState } from "react";
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
  const [otherLanguages, setOtherLanguages] = useState([]);

  const handleOtherLanguageChange = (languages) => {
    setOtherLanguages(languages);
  };

  const handleOtherLanguageDismiss = () => {
    setOtherLanguages([]);
  };

  useEffect(() => {
    handleOtherLanguageDismiss();
  }, [location]);

  // redirect to login if not authenticated
  if (auth) {
    return (
      <>
        {/* return the sidebar and the main content based on the user by changing the theme */}
        <Sidebar />
        <div
          id="main"
          className={`${isStudent(auth) ? "student-theme" : ""} ${
            isTeacher(auth) ? "teacher-theme" : ""
          }`}
        >
          {auth && isStudent(auth) && (
            <TopNavStudent
              isTaalprofiel={location.pathname.includes(
                TaalprofielRoutes.Index
              )}
            />
          )}
          {auth && isTeacher(auth) && (
            <TopNavTeacher otherLanguages={otherLanguages} />
          )}
          <Outlet
            context={{
              onOtherLanguageChange: handleOtherLanguageChange,
              onOtherLanguageDismiss: handleOtherLanguageDismiss,
            }}
          />
        </div>
      </>
    );
  }

  return <Navigate to={AuthRoutes.Login} state={{ from: location }} replace />;
};

export default AppLayout;
