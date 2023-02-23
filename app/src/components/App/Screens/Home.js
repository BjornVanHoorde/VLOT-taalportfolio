import { useAuthContext } from "../Auth/AuthProvider";
import StdSidebar from "../Shared/Generic/Sidebar/Sidebar";

const Home = () => {
  const { logout } = useAuthContext();

  return (
    <>
      <button color="danger" onClick={logout}>
        logout
      </button>
    </>
  );
};

export default Home;
