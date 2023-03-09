import { Link } from "react-router-dom";
import { KlasRoutes, route } from "../../../core/routes";

const SidebarNav = ({ itemsType, items = [], classname, children }) => {
  if (itemsType === "klassen") {
    return (
      <nav className={classname}>
        {items &&
          items.map((item) => (
            <li key={item.id}>
              <Link to={route(KlasRoutes.Overview, { klas: item.klas.klas })}>
                {item.klas.klas}
              </Link>
            </li>
          ))}
        {children}
      </nav>
    );
  } else {
    return (
      <nav className={classname}>
        {items &&
          items.map((item) => (
            <li key={item.label}>
              <Link to={item.href}>{item.label}</Link>
            </li>
          ))}
        {children}
      </nav>
    );
  }
};

export default SidebarNav;
