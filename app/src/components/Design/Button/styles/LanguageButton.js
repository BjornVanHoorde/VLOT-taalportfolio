const LanguageButton = ({ label, activeLanguage, onClick }) => {
  return (
    <button className={activeLanguage ? "active" : ""} onClick={onClick}>
      {label}
    </button>
  );
};

export default LanguageButton;
