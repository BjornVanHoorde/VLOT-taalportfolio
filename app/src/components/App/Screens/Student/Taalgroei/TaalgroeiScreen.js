import { Link } from "react-router-dom";
import { SubNav } from "../../../../../core/constants/SidebarNav";
import { isStudent } from "../../../../../core/helpers/isRole";
import '../Taalgroei/styles/taalgroeiScreen.css';


const TaalgroeiScreen = () => {
  return (
      <div className="taalgroei-index">
        <div className="taalgroei-title">
          <h2>Taalgroei</h2>
        </div>
        <div className="taalgroei-nav">
        {SubNav.map((item, index) => {
          return (
            <div 
            className={`${
              item.label !== 'Basisgeletterdheid' ? 'taalgroei-nav-item disabled' : 'taalgroei-nav-item'
            }`}>
              <Link key={index} to={item.href}>
                {item.label}
              </Link>
            </div>
          );
        })}
        </div>
    </div>
  );
};

export default TaalgroeiScreen;
