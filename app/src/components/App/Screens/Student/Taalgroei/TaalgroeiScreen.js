import { Link } from "react-router-dom";
import { SubNav } from "../../../../../core/constants/SidebarNav";

const TaalgroeiScreen = () => {
  return (
    <>
      {SubNav.map((item, index) => {
        return (
          <Link key={index} to={item.href}>
            {item.label}
          </Link>
        );
      })}
    </>
  );
};

export default TaalgroeiScreen;
