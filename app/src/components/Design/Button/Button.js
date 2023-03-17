import "./styles/Button.css";

const Button = ({ className, label, onClick, align, disabled }) => {
  if (align) {
    return (
      <div className={`${className ? className : ""} btn-div align-${align}`}>
        <button className="btn" onClick={onClick} disabled={disabled}>
          {label}
        </button>
      </div>
    );
  } else {
    return (
      <button
        className={`btn ${className ? className : ""}`}
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </button>
    );
  }
};

export default Button;
