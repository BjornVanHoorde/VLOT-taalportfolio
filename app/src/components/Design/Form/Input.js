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
      {error && <div className="invalid-feedback"> {error} </div>}
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
    </>
  );
};
export default Input;
