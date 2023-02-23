import AuthProvider from "./Auth/AuthProvider";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes, TaalprofielRoutes } from "../../core/routes";
import OnBoardingLayout from "./Auth/OnBoardingLayout";
import LoginScreen from "./Auth/login/LoginScreen";
import Home from "./Screens/Home";
import AuthContainer from "./Auth/AuthContainer";
import AppLayout from "./AppLayout";
import TaalprofielScreen from "./Screens/Taalprofiel/TaalprofielScreen";

const App = () => {
  return (
    <>
      <AuthProvider>
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
              path={TaalprofielRoutes.Index}
              element={<TaalprofielScreen />}
            />
            {/* NEDERLANDS */}
            {/* FRANS */}
            {/* ENGELS */}
            {/* DUITS */}
            {/* REST ROUTES */}
            <Route path="*" element={<Navigate to={AuthRoutes.Login} />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
