import "./styles/Alert.css";

const Alert = ({ message, onClick }) => {
  return (
    <div className="alert" onClick={onClick}>
      {message}
    </div>
  );
};

export default Alert;
