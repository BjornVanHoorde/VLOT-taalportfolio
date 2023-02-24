import logo from "../../../../../img/logo.svg";
import { useAuthContext } from "../../../Auth/AuthProvider";
import AccountInfo from "./AccountInfo";
// import JaarSelector from "./JaarSelector";
import Navigation from "./Navigation";
import "./styles/sidebar.css";

const StdSidebar = () => {
  const { logout } = useAuthContext();
  return (
    <div className="sidebar">
      <div id="sidebarLogo">
        <img src={logo} alt="logo van de school" />
      </div>
      {/* <JaarSelector /> */}
      <Navigation />
      <AccountInfo />
      <button className="logout-btn" onClick={logout}>
        logout
      </button>
    </div>
  );
};

export default StdSidebar;
