import { useNavigate } from "react-router-dom";
import TaalgroeiNav from "../../../Shared/Generic/TaalgroeiNav/TaalgroeiNav";
import "../Taalgroei/styles/taalgroeiScreen.css";

const TaalgroeiScreen = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate(e);
  };

  return (
    <div className="taalgroei-index">
      <div className="taalgroei-title">
        <h2>Taalgroei</h2>
      </div>
      <TaalgroeiNav onClick={handleClick} />
    </div>
  );
};

export default TaalgroeiScreen;
