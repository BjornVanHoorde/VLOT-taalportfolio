/* eslint-disable no-unused-vars */
/* eslint-disable no-loop-func */
import { useEffect } from "react";
import getEditStatusStudent from "../../../../core/helpers/getEditStatus";
import useAlert from "../../../../core/hooks/useAlert";
import useFetch from "../../../../core/hooks/useFetch";
import useMutation from "../../../../core/hooks/useMutation";
import Alert from "../../../Design/Alert/Alert";
import { useAuthContext } from "../../Auth/AuthProvider";
import { useLanguageContext } from "../../Language/LanguageProvider";
import TaalProfielForm from "../../Shared/Taalprofiel/Form";
import { useYearContext } from "../../Year/YearProvider";
import "./styles/overview.css";

const TaalprofielOverview = () => {
  const { currentLanguage } = useLanguageContext();
  const { selectedYear } = useYearContext();
  const { auth } = useAuthContext();
  const { isLoading, error, mutate } = useMutation();
  const { alert, showAlert, hideAlert } = useAlert();

  const { data: answers, invalidate } = useFetch(
    `/taalprofiel/antwoorden/leerling/${auth.user.id}/taal/${currentLanguage}/${selectedYear}`
  );

  console.log(answers);

  useEffect(() => {
    invalidate();
    console.log(currentLanguage);
  }, [currentLanguage, selectedYear]);

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
              invalidate();
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
      {answers?.length > 0 && (
        <TaalProfielForm
          answers={answers}
          onSubmit={handleSubmit}
          editStatusStudent={getEditStatusStudent(auth, selectedYear)}
          currentLanguage={currentLanguage}
        />
      )}
      {answers?.length === 0 && (
        <p className="no-answers">
          Er zijn nog geen vragen voor deze taal beschikbaar...
        </p>
      )}
    </>
  );
};

export default TaalprofielOverview;
