import { Choices } from "../../../../core/constants/Taalprofiel";
import Radio from "../../Form/Radio";
import "./styles/Multiple-choice.css";

const MultipleChoice = ({ answer, onChange, value }) => {
  return (
    <div className="field">
      <label>
        <p>{answer.vraag.vraag}</p>
      </label>
      <div className="choices">
        {Choices.map((choice) => (
          // console.log(choice.value === answer.answer);
          // console.log(choice.value);
          <Radio
            name={answer.id}
            value={choice.value}
            key={choice.value}
            onChange={onChange}
            checked={choice.value === value}
          />
        ))}
      </div>
    </div>
  );
};

export default MultipleChoice;
