import TaalgroeiNavItems from "../../../../../core/constants/TaalgroeiNavItems";
import TaalgroeiButton from "../../../../Design/Button/TaalgroeiButton";
import "./styles/TaalgroeiNav.css";

const TaalgroeiNav = ({ onClick, currentTab }) => {
  return (
    <div className="taalgroei-nav">
      {TaalgroeiNavItems.map((item) => (
        <TaalgroeiButton
          key={item.label}
          item={item}
          onClick={onClick}
          activeItem={currentTab}
        />
      ))}
    </div>
  );
};

export default TaalgroeiNav;
