import "./styles/Radio.css";

const Radio = ({ name, value, label, checked, onChange, disabled }) => {
  return (
    <>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
    </>
  );
};

export default Radio;
