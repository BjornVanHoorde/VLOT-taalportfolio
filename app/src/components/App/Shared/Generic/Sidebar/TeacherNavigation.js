import { isTeacher } from "../../../../../core/helpers/isRole";
import useFetch from "../../../../../core/hooks/useFetch";
import SidebarNav from "../../../../Design/Nav/SidebarNav";
import { useYearContext } from "../../../Year/YearProvider";

const TeacherNavigation = ({ auth }) => {
  const { selectedYear } = useYearContext();
  const {
    data: klassen,
    invalidate,
    isLoading,
  } = useFetch(`/leerkracht/${auth.user.id}/klassen/${selectedYear}`);

  return (
    <div id="sidebar-components">
      {isLoading && <p>Loading...</p>}
      {auth && isTeacher(auth) && klassen && (
        <SidebarNav itemsType="klassen" items={klassen} classname="main-nav" />
      )}
    </div>
  );
};

export default TeacherNavigation;
