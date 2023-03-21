import Delete from "../../../../../img/delete.svg";
import "./styles/ItemSidebar.css";

const ItemSidebar = ({
  title,
  hasAddButtun = false,
  items = [],
  onChange,
  activeItem,
  klas,
}) => {
  return (
    <div className="itemSidebar">
      {hasAddButtun && (
        <div className="itemSidebar__add">
          <div className="itemSidebar__add__text">
            <span>{title} toevoegen</span>
          </div>
          <div className="itemSidebar__add__plus">
            <strong>+</strong>
          </div>
        </div>
      )}
      <div
        className={`itemSidebar__item ${
          activeItem?.id === klas ? "active" : ""
        }`}
        onClick={() => onChange({ id: klas })}
      >
        <div className="itemSidebar__item__content">
          {title === "students" && <span>{klas}</span>}
        </div>
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          className={`itemSidebar__item ${
            activeItem?.id === item.id ? "active" : ""
          }`}
          onClick={() => onChange(item)}
        >
          <div className="itemSidebar__item__content">
            {title === "students" && (
              <span>{`${item.voornaam} ${item.achternaam}`}</span>
            )}
            {title !== "students" && (
              <span>Evaluatie {items.indexOf(item)}</span>
            )}
            {hasAddButtun && (
              <div className="itemSidebar__delete">
                <img src={Delete} alt="delete"></img>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemSidebar;
