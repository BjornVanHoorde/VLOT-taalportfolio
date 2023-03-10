import AuthProvider from "./Auth/AuthProvider";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import {
  AuthRoutes,
  KlasRoutes,
  ProfielRoute,
  TaalgroeiRoutes,
  TaalprofielRoutes,
} from "../../core/routes";
import OnBoardingLayout from "./Auth/OnBoardingLayout";
import LoginScreen from "./Auth/login/LoginScreen";
import Home from "./Screens/Home";
import AuthContainer from "./Auth/AuthContainer";
import AppLayout from "./AppLayout";
import TaalprofielScreen from "./Screens/Taalprofiel/TaalprofielScreen";
import LanguageProvider from "./Language/LanguageProvider";
import UserdetailsScreen from "./Screens/Userdetails/UserdetailsScreen";
import YearProvider from "./Year/YearProvider";
import VaardighedenScreen from "./Screens/Taalgroei/Vaardigheden/VaardighedenScreen";
import KlasOverview from "./Screens/Klas/KlasOverview";
import RoleContainer from "./Auth/RoleContainer";
import Roles from "../../core/constants/Roles";

const App = () => {
  return (
    <>
      <AuthProvider>
        <YearProvider>
          <LanguageProvider>
            <Routes>
              {/* AUTHROUTES */}
              <Route path={AuthRoutes.Index} element={<OnBoardingLayout />}>
                <Route path={AuthRoutes.Login} element={<LoginScreen />} />
              </Route>
              {/* MAIN ROUTES */}
              {/* From here on out you have te be logged in */}
              <Route
                element={
                  <AuthContainer>
                    <AppLayout />
                  </AuthContainer>
                }
              >
                <Route path="/home" element={<Home />} />
                <Route
                  path={ProfielRoute.Index}
                  element={<UserdetailsScreen />}
                />
                <Route
                  path={TaalprofielRoutes.Index}
                  element={<TaalprofielScreen />}
                />
                <Route path="*" element={<Navigate to="/home" />} />
                <Route
                  path={TaalgroeiRoutes.Vaardigheden}
                  element={<VaardighedenScreen />}
                />
                <Route
                  element={
                    <RoleContainer roles={[Roles.Admin, Roles.Teacher]}>
                      <Outlet />
                    </RoleContainer>
                  }
                >
                  <Route
                    path={KlasRoutes.Overview}
                    element={<KlasOverview />}
                  />
                </Route>
                <Route path="*" element={<Navigate to="/home" />} />
              </Route>
            </Routes>
          </LanguageProvider>
        </YearProvider>
      </AuthProvider>
    </>
  );
};

export default App;
