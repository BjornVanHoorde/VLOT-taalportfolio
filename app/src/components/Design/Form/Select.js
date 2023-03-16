import Proptypes from "prop-types";

const Select = ({ options = [], name, disabled, value, onChange, error, className="" }) => {
  return (
    <>
      <select
        name={name}
        disabled={disabled}
        value={String(value) || ""}
        onChange={onChange}
        className={className}
      >
        {options &&
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
      {error && <p className="error">{error}</p>}
    </>
  );
};

Select.propTypes = {
  options: Proptypes.arrayOf(
    Proptypes.shape({
      value: Proptypes.string.isRequired,
      label: Proptypes.string.isRequired,
    })
  ),
  name: Proptypes.string.isRequired,
  disabled: Proptypes.bool,
  value: Proptypes.string,
  onChange: Proptypes.func.isRequired,
  error: Proptypes.string,
};

export default Select;
