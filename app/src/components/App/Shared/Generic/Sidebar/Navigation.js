import { MainNav, SubNav } from "../../../../../core/constants/SidebarNav";
import { isStudent, isTeacher } from "../../../../../core/helpers/isRole";
import useFetch from "../../../../../core/hooks/useFetch";
import SidebarNav from "../../../../Design/Nav/SidebarNav";
import { useYearContext } from "../../../Year/YearProvider";

const Navigation = ({ auth }) => {
  const { selectedYear } = useYearContext();
  const {
    data: klassen,
    invalidate,
    isLoading,
  } = useFetch(`/leerkracht/${auth.user.id}/klassen/${selectedYear}`);

  return (
    <div id="sidebar-components">
      {auth && isStudent(auth) && (
        <SidebarNav items={MainNav} classname="main-nav">
          <SidebarNav items={SubNav} classname="sub-nav" />
        </SidebarNav>
      )}
      {auth && isTeacher(auth) && klassen && (
        <SidebarNav itemsType="klassen" items={klassen} classname="main-nav" />
      )}
    </div>
  );
};

export default Navigation;
