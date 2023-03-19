import { isStudent, isTeacher } from "../../../../../core/helpers/isRole";
import logo from "../../../../../img/logo.svg";
import { useAuthContext } from "../../../Auth/AuthProvider";
import AccountInfo from "./AccountInfo";
import JaarSelector from "./JaarSelector";
import "./styles/sidebar.css";
import StudentNavigation from "./StudentNavigation";
import TeacherNavigation from "./TeacherNavigation";

const Sidebar = () => {
  const { auth, logout } = useAuthContext();

  return (
    <div
      className={`sidebar ${isStudent(auth) ? "student-theme" : ""} ${
        isTeacher(auth) ? "teacher-theme" : ""
      }`}
    >
      <div id="sidebarLogo">
        <img src={logo} alt="logo van de school" />
      </div>
      <JaarSelector />
      {isStudent(auth) && <StudentNavigation auth={auth} />}
      {isTeacher(auth) && <TeacherNavigation auth={auth} />}
      <AccountInfo />
      <button className="logout-btn" onClick={logout}>
        logout
      </button>
    </div>
  );
};

export default Sidebar;
