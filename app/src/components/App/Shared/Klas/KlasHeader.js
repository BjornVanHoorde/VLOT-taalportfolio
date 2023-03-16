import { useEffect, useState } from "react";
import Input from "../../../Design/Form/Input";
import "./styles/KlasHeader.css";

const KlasHeader = ({ klas, onSearch }) => {
  // State for the search input
  const [inputValue, setInputValue] = useState("");
  const [toggleIcon, setToggleIcon] = useState("search");

  // Handle the search input
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFocus = () => {
    setToggleIcon("");
  };
  const lostFocus = (e) => {
    setInputValue("");
    setToggleIcon("search");
  };

  // Filter the students based on the search input
  useEffect(() => {
    onSearch(inputValue);
  }, [inputValue, klas]);

  return (
    <div className="klas-overview__header">
      <div className="klas-overview__header__title">
        <h1>{klas}: leerlingen</h1>
      </div>
      <div className="klas-overview__header__search">
        <Input
          value={inputValue}
          onChange={handleChange}
          type="text"
          name="search"
          onFocus={handleFocus}
          onBlur={lostFocus}
          className={toggleIcon}
        />
      </div>
    </div>
  );
};

export default KlasHeader;
