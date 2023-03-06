import { Choices } from "../../../core/constants/Taalprofiel";

const ChoicesLabels = ({ currentLangauge }) => {
  return (
    <div className="choices">
      {Choices.map((choice) => (
        <p key={choice.values[currentLangauge]}>
          {choice.values[currentLangauge]}
        </p>
      ))}
    </div>
  );
};

export default ChoicesLabels;
