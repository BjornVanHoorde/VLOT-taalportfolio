/* eslint-disable no-unused-vars */
/* eslint-disable no-loop-func */
import { useEffect, useState } from "react";
import Languages from "../../../../../core/constants/Languages";
import getEditStatusStudent from "../../../../../core/helpers/getEditStatus";
import useAlert from "../../../../../core/hooks/useAlert";
import useMutation from "../../../../../core/hooks/useMutation";
import Alert from "../../../../Design/Alert/Alert";
import Button from "../../../../Design/Button/Button";
import { useAuthContext } from "../../../Auth/AuthProvider";
import { useLanguageContext } from "../../../Language/LanguageProvider";
import DeleteButton from "../../../Shared/Buttons/DeleteButtons";
import CreateLanguageForm from "../../../Shared/Taalprofiel/CreateLanguageForm";
import TaalProfielForm from "../../../Shared/Taalprofiel/Form";
import { useYearContext } from "../../../Year/YearProvider";
import "./styles/Overview.css";

const TaalprofielOverview = ({ answers, handleChange }) => {
  const { currentLanguage, changeLanguage } = useLanguageContext();
  const { selectedYear } = useYearContext();
  const { auth } = useAuthContext();
  const { isLoading, error, mutate } = useMutation();
  const { alert, showAlert, hideAlert } = useAlert();
  const [filteredData, setFilteredData] = useState();
  const [showModal, setShowModal] = useState(false);

  // If the answers are for a made up language, filter them by the language
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

  // Refilter the data when the answers change
  useEffect(() => {
    filterByOtherLanguage(answers);
  }, [answers]);

  // handle the submit of the form
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

  // handle the delete of a language
  const handleDelete = () => {
    changeLanguage(Languages.Dutch);
    handleChange();
    showAlert("De taal is verwijderd.");
    window.location.reload();
  };

  // handle the edit of a language
  const handleEdit = () => {
    changeLanguage(Languages.Dutch);
    handleChange();
    showAlert("De taal is aangepast.");
    window.location.reload();
  };

  return (
    <div className="taalprofiel-overview">
      {alert && (
        <div className="alert-list">
          <Alert message={alert.message} onClick={hideAlert} />
        </div>
      )}
      {/* If the current language is not a self made one, do not show these options */}
      {currentLanguage.split(" ").length > 1 &&
        filteredData?.[0].andereTaal && (
          <div className="language-options">
            <Button
              label="Bewerk taal"
              onClick={() => setShowModal(true)}
              disabled={isLoading}
            />
            <DeleteButton
              label="Verwijder taal"
              onSuccess={handleDelete}
              scope="andere-talen"
              id={filteredData[0].andereTaal.id}
              disabled={isLoading}
            />
          </div>
        )}
      {filteredData?.length > 0 && (
        <TaalProfielForm
          answers={filteredData}
          onSubmit={handleSubmit}
          editStatusStudent={getEditStatusStudent(auth, selectedYear)}
          currentLanguage={currentLanguage}
          disabled={isLoading}
        />
      )}
      {filteredData?.length === 0 && (
        <p className="no-answers">
          Er zijn nog geen vragen voor deze taal beschikbaar...
        </p>
      )}
      {/* form for making a language */}
      {showModal && (
        <CreateLanguageForm
          onSuccess={handleEdit}
          onDismiss={() => setShowModal(false)}
          otherLanguage={filteredData?.[0].andereTaal}
          disabled={isLoading}
        />
      )}
    </div>
  );
};

export default TaalprofielOverview;
