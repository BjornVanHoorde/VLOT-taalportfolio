/* eslint-disable no-unused-vars */
/* eslint-disable no-loop-func */
import { useEffect, useState } from "react";
import { isTeacher } from "../../../../../core/helpers/isRole";
import { useAuthContext } from "../../../Auth/AuthProvider";
import { useLanguageContext } from "../../../Language/LanguageProvider";
import TaalProfielForm from "../../../Shared/Taalprofiel/Form";
import "./styles/Overview.css";

const Overview = ({ answers }) => {
  const { currentLanguage } = useLanguageContext();
  const { auth } = useAuthContext();
  const [filteredData, setFilteredData] = useState();

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

  return (
    <>
      {filteredData?.length > 0 && (
        <TaalProfielForm
          answers={filteredData}
          isTeacher={isTeacher(auth)}
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

export default Overview;
