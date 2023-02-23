import { Choices } from "../../../../core/constants/Taalprofiel";
import Radio from "../../Form/Radio";

const MultipleChoice = ({ vraag }) => {
  return (
    <div className="field">
      <label>{vraag.vraag}</label>
      <div className="choices">
        {Choices.map((choice) => (
          <Radio name={vraag.id} value={choice.value} key={choice.value} />
        ))}
      </div>
    </div>
  );
};

export default MultipleChoice;
