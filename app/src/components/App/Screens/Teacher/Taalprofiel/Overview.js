/* eslint-disable no-unused-vars */
/* eslint-disable no-loop-func */
import { useEffect, useState } from "react";
import { isTeacher } from "../../../../../core/helpers/isRole";
import { useAuthContext } from "../../../Auth/AuthProvider";
import { useLanguageContext } from "../../../Language/LanguageProvider";
import TaalProfielForm from "../../../Shared/Taalprofiel/Form";
import "./styles/Overview.css";

const Overview = ({ answers, klas, studentList }) => {
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

  console.log(answers);

  return (
    <>
      {filteredData?.length > 0 && !klas && (
        <TaalProfielForm
          answers={filteredData}
          isTeacher={isTeacher(auth)}
          currentLanguage={currentLanguage}
        />
      )}
      {filteredData?.length > 0 && studentList?.length >= 1 && klas && (
        <div className="taalprofiel-long-list">
          {studentList.map((student) => (
            <div key={student.id}>
              <h2>{`${student.voornaam} ${student.achternaam}`}</h2>
              <TaalProfielForm
                answers={filteredData.filter(
                  (answer) => answer.leerling?.id === student.id
                )}
                isTeacher={isTeacher(auth)}
                currentLanguage={currentLanguage}
              />
            </div>
          ))}
        </div>
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
