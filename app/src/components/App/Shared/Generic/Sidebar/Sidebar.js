import logo from "../../../../../img/logo.svg";
import AccountInfo from "./AccountInfo";
import JaarSelector from "./JaarSelector";
import Navigation from "./Navigation";
import "./styles/sidebar.css";

const StdSidebar = () => {
  return (
    <div className="sidebar">
      <div id="sidebarLogo">
        <img src={logo} alt="logo van de school" />
      </div>
      <JaarSelector />
      <Navigation />
      <AccountInfo />
    </div>
  );
};

export default StdSidebar;
