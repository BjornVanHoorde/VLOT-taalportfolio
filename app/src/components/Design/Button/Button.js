import "./styles/Button.css";

const Button = ({ className, label, onClick, align }) => {
  if (align) {
    return (
      <div className={`${className ? className : ""} btn-div align-${align}`}>
        <button className="btn" onClick={onClick}>
          {label}
        </button>
      </div>
    );
  } else {
    return (
      <button className={`btn ${className ? className : ""}`} onClick={onClick}>
        {label}
      </button>
    );
  }
};

export default Button;
