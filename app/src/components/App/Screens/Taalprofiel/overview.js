/* eslint-disable no-unused-vars */
/* eslint-disable no-loop-func */
import { useEffect, useState } from "react";
import getEditStatusStudent from "../../../../core/helpers/getEditStatus";
import useAlert from "../../../../core/hooks/useAlert";
import useMutation from "../../../../core/hooks/useMutation";
import Alert from "../../../Design/Alert/Alert";
import { useAuthContext } from "../../Auth/AuthProvider";
import { useLanguageContext } from "../../Language/LanguageProvider";
import TaalProfielForm from "../../Shared/Taalprofiel/Form";
import { useYearContext } from "../../Year/YearProvider";
import "./styles/overview.css";

const TaalprofielOverview = ({ answers, handleChange }) => {
  const { currentLanguage } = useLanguageContext();
  const { selectedYear } = useYearContext();
  const { auth } = useAuthContext();
  const { isLoading, error, mutate } = useMutation();
  const { alert, showAlert, hideAlert } = useAlert();
  const [filteredData, setFilteredData] = useState(answers);

  const filterByOtherLanguage = (answers) => {
    if (!(currentLanguage.split(" ").length > 1)) {
      setFilteredData(answers);
    } else {
      const filteredAnswers = answers.filter(
        (answer) => answer.andereTaal.taal === currentLanguage.split(" ").pop()
      );
      setFilteredData(filteredAnswers);
    }
  };

  useEffect(() => {
    filterByOtherLanguage(answers);
  }, [answers]);

  const handleSubmit = (values) => {
    const length = Object.keys(values).length;
    let count = 0;
    for (const index in values) {
      count++;
      mutate(
        `${process.env.REACT_APP_API_URL}/taalprofiel/antwoorden/${index}`,
        {
          method: "PATCH",
          data: { antwoord: values[index] },
          onSuccess: () => {
            if (count === length) {
              handleChange();
              showAlert("De antwoorden zijn opgeslagen.");
              window.scrollTo(0, 0);
            }
          },
        }
      );
    }
  };

  return (
    <>
      {alert && <Alert message={alert.message} onClick={hideAlert} />}
      {filteredData?.length > 0 && (
        <TaalProfielForm
          answers={filteredData}
          onSubmit={handleSubmit}
          editStatusStudent={getEditStatusStudent(auth, selectedYear)}
          currentLanguage={currentLanguage}
        />
      )}
      {filteredData?.length === 0 && (
        <p className="no-answers">
          Er zijn nog geen vragen voor deze taal beschikbaar...
        </p>
      )}
    </>
  );
};

export default TaalprofielOverview;
