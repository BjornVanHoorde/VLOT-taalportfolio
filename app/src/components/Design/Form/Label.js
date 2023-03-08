import "./styles/Label.css";

const Label = ({ children, htmlFor }) => {
  return (
    <label htmlFor={htmlFor} className="form-label d-block mb-0">
      {children}
    </label>
  );
};

export default Label;
