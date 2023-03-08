import "./styles/Input.css";

const Input = ({
  type,
  name,
  disabled,
  value,
  onChange,
  onBlur,
  children,
  error,
  ...rest
}) => {
  return (
    <>
      <input
        type={type}
        name={name}
        disabled={disabled}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        {...rest}
      />
      {children}
      {error && <div className="invalid-feedback d-block"> {error} </div>}
    </>
  );
};
export default Input;
