import { MainNav, SubNav } from "../../../../../core/constants/SidebarNav";
import SidebarNav from "../../../../Design/Nav/SidebarNav";

const Navigation = () => {
  return (
    <div id="sidebar-components">
      <SidebarNav items={MainNav} classname="main-nav">
        <SidebarNav items={SubNav} classname="sub-nav" />
      </SidebarNav>
    </div>
  );
};

export default Navigation;
