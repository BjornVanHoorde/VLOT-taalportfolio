import "./styles/TaalgroeiButton.css";

const TaalgroeiButton = ({ onClick, item, activeItem }) => {
  return (
    <button
      className={`taalgroei-nav-item ${
        activeItem === item.label ? "active" : ""
      }`}
      key={item.label}
      onClick={() => onClick(item.label)}
    >
      <p>{item.label}</p>
    </button>
  );
};

export default TaalgroeiButton;
