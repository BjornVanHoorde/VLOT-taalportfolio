import { useYearContext } from "../../App/Year/YearProvider";

const LanguageButton = ({
  label,
  activeLanguage,
  onClick,
  isTeacher,
  klasYear,
}) => {
  const { selectedYear } = useYearContext();

  // return button if the label is Duits and if the selectedyear is greater then 2
  if (label === "Duits") {
    if (selectedYear > 2 || (isTeacher && klasYear > 2)) {
      return (
        <button className={activeLanguage ? "active" : ""} onClick={onClick}>
          {label}
        </button>
      );
    }
  } else {
    return (
      <button className={activeLanguage ? "active" : ""} onClick={onClick}>
        {label}
      </button>
    );
  }
};

export default LanguageButton;
