import AuthProvider from "./Auth/AuthProvider";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../../core/routes";
import OnBoardingLayout from "./Auth/OnBoardingLayout";
import LoginScreen from "./Auth/login/LoginScreen";
import Home from "./Screens/Home";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Routes>
          {/* AUTHROUTES */}
          <Route path={AuthRoutes.Index} element={<OnBoardingLayout />}>
            <Route path={AuthRoutes.Login} element={<LoginScreen />} />
          </Route>
          <Route path="/home" element={<Home />} />
          {/* REST ROUTES */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
