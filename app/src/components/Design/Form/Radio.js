import "./styles/Radio.css";

const Radio = ({ name, value, label, checked, onChange }) => {
  return (
    <>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
    </>
  );
};

export default Radio;
