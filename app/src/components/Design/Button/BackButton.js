import "./styles/BackButton.css";

const BackButton = ({ label, onClick }) => {
  return (
    <button className="backBtn" onClick={onClick}>
      {label}
    </button>
  );
};

export default BackButton;
