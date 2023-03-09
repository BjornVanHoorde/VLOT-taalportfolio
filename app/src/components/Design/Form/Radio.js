import "./styles/Radio.css";

const Radio = ({
  name,
  value,
  label,
  checked,
  onChange,
  disabled,
  required,
}) => {
  return (
    <>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        required={required}
      />
    </>
  );
};

export default Radio;
