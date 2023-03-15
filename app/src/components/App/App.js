import AuthProvider from "./Auth/AuthProvider";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import {
  AllStudentRoutes,
  AuthRoutes,
  KlasRoutes,
  ProfielRoute,
  StudentRoutes,
  TaaldossierRoutes,
  TaalgroeiRoutes,
  TaalprofielRoutes,
} from "../../core/routes";
import OnBoardingLayout from "./Auth/OnBoardingLayout";
import LoginScreen from "./Auth/login/LoginScreen";
import Home from "./Screens/Home";
import AuthContainer from "./Auth/AuthContainer";
import AppLayout from "./AppLayout";
import TaalprofielScreen from "./Screens/Student/Taalprofiel/TaalprofielScreen";
import LanguageProvider from "./Language/LanguageProvider";
import UserdetailsScreen from "./Screens/Userdetails/UserdetailsScreen";
import YearProvider from "./Year/YearProvider";
import VaardighedenScreen from "./Screens/Student/Taalgroei/Vaardigheden/VaardighedenScreen";
import KlasOverview from "./Screens/Teacher/Klas/KlasOverview";
import RoleContainer from "./Auth/RoleContainer";
import Roles from "../../core/constants/Roles";
import StudentLayout from "./Screens/Teacher/Student/StudentLayout";
import StudentOverview from "./Screens/Teacher/Student/StudentOverview";
import TaalprofielLayout from "./Screens/Teacher/Taalprofiel/TaalprofielLayout";
import TaalprofielOverview from "./Screens/Teacher/Taalprofiel/TaalprofielOverview";
import AllStudentsLayout from "./Screens/Teacher/AllStudents/AllStudentsLayout";
import AllStudentsOverview from "./Screens/Teacher/AllStudents/AllStudentsOverview";
import TaaldossierScreen from "./Screens/Student/Taaldossier/TaaldossierScreen";
import FoutanalyseScreen from "./Screens/Student/Taalgroei/Foutanalyse/FoutanalyseScreen";
import WoordenschatScreen from "./Screens/Student/Taalgroei/Woordenschat/WoordenschatScreen";
import TaaltipsScreen from "./Screens/Student/Taalgroei/Taaltips/TaaltipsScreen";
import BasisgeletterdheidScreen from "./Screens/Student/Taalgroei/Basisgeletterdheid/BasisgeletterdheidScreen";
import TaalgroeiScreen from "./Screens/Student/Taalgroei/TaalgroeiScreen";

// This is the main app component with all the routes
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
                {/* HOME ROUTE */}
                <Route path="/home" element={<Home />} />
                {/* PROFIEL ROUTES */}
                <Route
                  path={ProfielRoute.Index}
                  element={<UserdetailsScreen />}
                />
                {/*
                 * STUDENT ROUTES
                 */}
                <Route
                  element={
                    <RoleContainer roles={[Roles.Admin, Roles.Student]}>
                      <Outlet />
                    </RoleContainer>
                  }
                >
                  {/* TAALPROFIEL ROUTES */}
                  <Route
                    path={TaalprofielRoutes.Index}
                    element={<TaalprofielScreen />}
                  />
                  {/* TAALDOSSIER ROUTES */}
                  <Route
                    path={TaaldossierRoutes.Index}
                    element={<TaaldossierScreen />}
                  />
                  {/* TAALGROEI ROUTES */}
                  <Route
                    path={TaalgroeiRoutes.Index}
                    element={<TaalgroeiScreen />}
                  />
                  <Route
                    path={TaalgroeiRoutes.Vaardigheden}
                    element={<VaardighedenScreen />}
                  />
                  <Route
                    path={TaalgroeiRoutes.Foutanalyse}
                    element={<FoutanalyseScreen />}
                  />
                  <Route
                    path={TaalgroeiRoutes.Woordenschat}
                    element={<WoordenschatScreen />}
                  />
                  <Route
                    path={TaalgroeiRoutes.Taaltips}
                    element={<TaaltipsScreen />}
                  />
                  <Route
                    path={TaalgroeiRoutes.Basisgeletterdheid}
                    element={<BasisgeletterdheidScreen />}
                  />
                </Route>
                {/*
                 * TEACHER ROUTES
                 */}
                <Route
                  element={
                    <RoleContainer roles={[Roles.Admin, Roles.Teacher]}>
                      <Outlet />
                    </RoleContainer>
                  }
                >
                  {/* TEACHER KLAS ROUTES */}
                  <Route
                    path={KlasRoutes.Overview}
                    element={<KlasOverview />}
                  />
                </Route>
                {/* TEACHER STUDENT ROUTES */}
                <Route path={StudentRoutes.Index} element={<StudentLayout />}>
                  <Route
                    path={StudentRoutes.Overview}
                    element={<StudentOverview />}
                  />
                </Route>
                {/* TEACHER ALLSTUDENTS ROUTES */}
                <Route
                  path={AllStudentRoutes.Index}
                  element={<AllStudentsLayout />}
                >
                  <Route
                    path={AllStudentRoutes.Overview}
                    element={<AllStudentsOverview />}
                  />
                </Route>
                {/* TEACHER TAALPROFIEL ROUTES */}
                <Route
                  path={TaalprofielRoutes.Index}
                  element={<TaalprofielLayout />}
                >
                  <Route
                    path={TaalprofielRoutes.Overview}
                    element={<TaalprofielOverview />}
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
