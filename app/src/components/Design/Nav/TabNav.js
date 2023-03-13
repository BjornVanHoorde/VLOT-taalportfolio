import "./styles/TabNav.css";

const TabNav = ({ items = [], onChange, activeTab }) => {
  return (
    <>
      <div className="tabNav">
        <nav>
          {items.map((item) => (
            <button
              onClick={() => onChange(item.label)}
              key={item.label}
              className={`tabNav-button ${
                activeTab === item.label ? "active" : ""
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
