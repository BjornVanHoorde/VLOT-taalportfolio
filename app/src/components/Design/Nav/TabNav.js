import { useNavigate } from "react-router-dom";
import { route } from "../../../core/routes";
import "./styles/TabNav.css";

const TabNav = ({ items = [], student }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="tabNav">
        <nav>
          {items.map((item) => (
            <button
              onClick={() => navigate(route(item.href, { student: student }))}
              key={item.label}
              className={`tabNav-button ${
                route(item.href, { student: student }) ===
                window.location.pathname.replace(/%20/g, " ")
                  ? "active"
                  : ""
              }`}
            >
              <p>{item.label}</p>
            </button>
          ))}
        </nav>
      </div>
      <div className="lijn"></div>
    </>
  );
};

export default TabNav;
