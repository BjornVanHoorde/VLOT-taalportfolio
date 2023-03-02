import { useEffect } from "react";
import Roles from "../../../../core/constants/Roles";
import { Choices, QuestionTypes } from "../../../../core/constants/Taalprofiel";
import useForm from "../../../../core/hooks/useForm";
import Button from "../../../Design/Button/Button";
import MultipleChoice from "../../../Design/Modules/Taalprofiel/Multiple-choice";
import Open from "../../../Design/Modules/Taalprofiel/Open";
import { useAuthContext } from "../../Auth/AuthProvider";

const transformData = (initialData) => {
  const transformedData = {};

  initialData.forEach((data) => {
    transformedData[data.id] = data.antwoord;
  });

  return transformedData;
};

const TaalProfielForm = ({ answers, onSubmit }) => {
  const { auth } = useAuthContext();
  const { values, handleChange, handleSubmit, handleInvalidate } = useForm(
    null,
    transformData(answers)
  );

  useEffect(() => {
    handleInvalidate(transformData(answers));
  }, [answers]);

  const handleData = (values) => {
    onSubmit(values);
  };

  return (
    <form className="taalprofiel" onSubmit={handleSubmit(handleData)}>
      <div className="multiple-choice">
        <div className="field options">
          <label></label>
          <div className="choices">
            {Choices.map((choice) => (
              <p key={choice.value}>{choice.value}</p>
            ))}
          </div>
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
                />
              );
            }
          })}
      </div>
      <div className="btn-div">
        {auth.user.rol === Roles.Student && <Button label="Opslaan" />}
      </div>
    </form>
  );
};

export default TaalProfielForm;
