import Roles from "../../../core/constants/Roles";
import { useAuthContext } from "../../App/Auth/AuthProvider";
import "./styles/Button.css";

const Button = ({ className, label, onClick, align, disabled }) => {
  const { auth } = useAuthContext();
  if (align) {
    return (
      <div className={`${className ? className : ""} btn-div align-${align}${auth.user.rol === Roles.Teacher ? '-teacher' : ""}`}>
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
