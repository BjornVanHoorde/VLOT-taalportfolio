import { useEffect } from "react";
import useFetch from "../../../../../core/hooks/useFetch";
import Loading from "../../../../Design/Loading/Loading";
import Message from "../../../../Design/Message/Message";
import { useLanguageContext } from "../../../Language/LanguageProvider";
import { useYearContext } from "../../../Year/YearProvider";
import Overview from "./Overview";

const TaalprofielOverview = ({ student, klas, onUpdate }) => {
  const { currentLanguage } = useLanguageContext();
  const { selectedYear } = useYearContext();

  const {
    data: answers,
    isLoading,
    invalidate,
  } = useFetch(
    student
      ? `/taalprofiel/antwoorden/leerling/${`${student.id}`}/${
          currentLanguage.split(" ")[0]
        }/${selectedYear}`
      : klas
      ? `/taalprofiel/antwoorden/klas/${klas}/${
          currentLanguage.split(" ")[0]
        }/${selectedYear}`
      : null
  );

  const {
    data: students,
    isLoading: isLoadingStudents,
    invalidate: invalidateStudents,
  } = useFetch(klas ? `/students/klas/name/${klas}` : null);

  useEffect(() => {
    invalidate();
  }, [currentLanguage, selectedYear, student, klas]);

  useEffect(() => {
    invalidateStudents();
  }, [klas]);

  return (
    <>
      {isLoading && <Loading />}
      {answers && answers.length > 0 && students && (
        <Overview
          answers={answers}
          handleChange={invalidate}
          klas={klas ? klas : null}
          studentList={students}
        />
      )}
      {answers && answers.length > 0 && !students && (
        <Overview
          answers={answers}
          handleChange={invalidate}
          klas={klas ? klas : null}
        />
      )}
      {answers && answers.length === 0 && (
        <Message message="Er zijn nog geen vragen voor dit taalprofiel" />
      )}
    </>
  );
};

export default TaalprofielOverview;
