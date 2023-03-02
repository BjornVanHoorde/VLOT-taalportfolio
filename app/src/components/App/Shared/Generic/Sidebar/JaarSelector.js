import Select from "../../../../Design/Form/Select";
import { useYearContext } from "../../../Year/YearProvider";

const JaarSelector = () => {
  const { selectedYear, availableYears, changeYear } = useYearContext();
  const handleChange = (e) => {
    changeYear(e.target.value);
  };

  return (
    <div id="jaar-selector">
      <Select
        options={availableYears}
        name="jaar"
        disabled={false}
        value={selectedYear}
        onChange={handleChange}
        error=""
      />
    </div>
  );
};

export default JaarSelector;
