import Years from "../../../../../core/constants/Years";
import Select from "../../../../Design/Form/Select";

const JaarSelector = () => {
  return (
    <div id="jaar-selector">
      <Select
        options={Years}
        name="jaar"
        disabled={false}
        value="jaar"
        onChange={() => {}}
        error=""
      />
    </div>
  );
};

export default JaarSelector;
