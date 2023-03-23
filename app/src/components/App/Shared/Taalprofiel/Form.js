import { useEffect } from "react";
import Roles from "../../../../core/constants/Roles";
import { QuestionTypes } from "../../../../core/constants/Taalprofiel";
import useForm from "../../../../core/hooks/useForm";
import Button from "../../../Design/Button/Button";
import ChoicesLabels from "../../../Design/Form/ChoicesLabels";
import MultipleChoice from "../../../Design/Modules/Taalprofiel/Multiple-choice";
import Open from "../../../Design/Modules/Taalprofiel/Open";
import { useAuthContext } from "../../Auth/AuthProvider";
import "../../Screens/Teacher/Taalprofiel/styles/TaalprofielScreen.css";

// tranform the data to a format that can be used by the useForm hook
const transformData = (initialData) => {
  const transformedData = {};

  initialData.forEach((data) => {
    transformedData[data.id] = data.antwoord;
  });

  return transformedData;
};

const TaalProfielForm = ({
  answers,
  onSubmit,
  editStatusStudent,
  currentLanguage,
  isTeacher,
  disabled,
}) => {
  const { auth } = useAuthContext();
  const { values, handleChange, handleSubmit, handleInvalidate } = useForm(
    null,
    transformData(answers)
  );

  // invalidate the form when the answers change
  useEffect(() => {
    handleInvalidate(transformData(answers));
  }, [answers]);

  const handleData = (values) => {
    onSubmit(values);
  };

  return (
    <form
      className={`taalprofiel ${auth.user.rol.toLowerCase()}`}
      onSubmit={handleSubmit(handleData)}
    >
      <div className="multiple-choice">
        <div className="field options">
          <label className="multiple-choice-label"></label>
          <ChoicesLabels currentLangauge={currentLanguage} />
        </div>
        {answers &&
          answers.map((answer) => {
            if (answer.vraag.soortVraag === QuestionTypes.MultipleChoice) {
              return (
                <MultipleChoice
                  answer={answer}
                  key={answer.id}
                  onChange={handleChange}
                  value={values[answer.id]}
                  currentLanguage={currentLanguage}
                  disabled={editStatusStudent || isTeacher || disabled}
                  required={true}
                />
              );
            }
          })}
      </div>
      <div className="open">
        {answers &&
          answers.map((answer) => {
            if (answer.vraag.soortVraag === QuestionTypes.Open) {
              return (
                <Open
                  answer={answer}
                  key={answer.id}
                  onChange={handleChange}
                  value={values[answer.id]}
                  readOnly={editStatusStudent || isTeacher}
                  disabled={disabled}
                />
              );
            }
          })}
      </div>
      {!editStatusStudent && auth.user.rol === Roles.Student && (
        <Button
          align="right"
          label="Opslaan"
          className="form-button"
          disabled={disabled}
        />
      )}
    </form>
  );
};

export default TaalProfielForm;
