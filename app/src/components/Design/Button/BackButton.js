import "./styles/BackButton.css";
import back from '../../../img/dropdown-teacher.svg';

const BackButton = ({ label, onClick }) => {
  return (
    <button className="backBtn" onClick={onClick}>
      <div className="back-circle">
        <img src={back} alt="back" />
      </div>
      <div className="back-label">
        {label}
      </div>
    </button>
  );
};

export default BackButton;
