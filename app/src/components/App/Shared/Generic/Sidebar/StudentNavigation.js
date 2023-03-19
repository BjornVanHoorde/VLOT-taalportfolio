import { MainNav, SubNav } from "../../../../../core/constants/SidebarNav";
import { isStudent } from "../../../../../core/helpers/isRole";
import SidebarNav from "../../../../Design/Nav/SidebarNav";

const StudentNavigation = ({ auth }) => {
  return (
    <div id="sidebar-components">
      {auth && isStudent(auth) && (
        <SidebarNav items={MainNav} classname="main-nav">
          <SidebarNav items={SubNav} classname="sub-nav" />
        </SidebarNav>
      )}
    </div>
  );
};

export default StudentNavigation;
