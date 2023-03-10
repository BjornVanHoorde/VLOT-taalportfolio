import "./styles/TabNav.css";

const TabNav = ({ items = [] }) => {
  return (
    <>
      <div className="tabNav">
        <nav>
          {items.map((item) => (
            <button key={item} className="tabNav-button">
              <p>{item}</p>
            </button>
          ))}
        </nav>
      </div>
      <div className="lijn"></div>
    </>
  );
};

export default TabNav;
