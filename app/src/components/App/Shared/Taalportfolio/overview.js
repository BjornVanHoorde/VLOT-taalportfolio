import { QuestionTypes } from "../../../../core/constants/Taalprofiel";
import useFetch from "../../../../core/hooks/useFetch";
import MultipleChoice from "../../../Design/Modules/Taalprofiel/Multiple-choice";
import Open from "../../../Design/Modules/Taalprofiel/Open";
import { useLanguageContext } from "../../Language/LanguageProvider";

const TaalprofielOverview = () => {
  const { currentLanguage } = useLanguageContext();

  const {
    isLoading,
    error,
    data: vragen,
    invalidate,
  } = useFetch("/taalprofiel/vragen");

  return (
    <form className="taalprofiel">
      <div className="multiple-choice">
        <div className="field options">
          <label></label>
          <div className="choices">
            <p>Heel weinig</p>
            <p>Weinig</p>
            <p>Veel</p>
            <p>Heel veel</p>
          </div>
        </div>
        {vragen &&
          vragen.map((vraag) => {
            if (
              vraag.soortVraag === QuestionTypes.MultipleChoice &&
              vraag.taal === currentLanguage
            ) {
              return <MultipleChoice vraag={vraag} key={vraag.id} />;
            }
          })}
      </div>
      <div className="open">
        {vragen &&
          vragen.map((vraag) => {
            if (
              vraag.soortVraag === QuestionTypes.Open &&
              vraag.taal === currentLanguage
            ) {
              return <Open vraag={vraag} key={vraag.id} />;
            }
          })}
      </div>
    </form>
  );
};

export default TaalprofielOverview;
