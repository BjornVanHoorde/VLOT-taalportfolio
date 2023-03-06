import { Choices } from "../../../../core/constants/Taalprofiel";
import Radio from "../../Form/Radio";
import "./styles/Multiple-choice.css";

const MultipleChoice = ({
  answer,
  onChange,
  value,
  disabled,
  currentLanguage,
}) => {
  return (
    <div className="field">
      <label>
        <p>{answer.vraag.vraag}</p>
      </label>
      <div className="choices">
        {Choices.map((choice) => (
          <Radio
            name={answer.id}
            value={choice.values[currentLanguage]}
            key={choice.values[currentLanguage]}
            onChange={onChange}
            checked={choice.values[currentLanguage] === value}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
};

export default MultipleChoice;
