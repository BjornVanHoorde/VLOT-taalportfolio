import "./styles/Label.css";

const Label = ({ children, htmlFor }) => {
  return (
    <label htmlFor={htmlFor} className="form-label">
      {children}
    </label>
  );
};

export default Label;
