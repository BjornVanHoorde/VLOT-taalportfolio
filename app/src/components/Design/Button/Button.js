import "./styles/Button.css";

const Button = ({ label, onClick, align }) => {
  if (align) {
    return (
      <div className={`btn-div align-${align}`}>
        <button className="btn" onClick={onClick}>
          {label}
        </button>
      </div>
    );
  } else {
    return (
      <button className="btn" onClick={onClick}>
        {label}
      </button>
    );
  }
};

export default Button;
