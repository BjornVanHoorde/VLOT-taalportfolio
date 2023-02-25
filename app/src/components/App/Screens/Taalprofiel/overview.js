import { useEffect } from "react";
import useFetch from "../../../../core/hooks/useFetch";
import useMutation from "../../../../core/hooks/useMutation";
import { useAuthContext } from "../../Auth/AuthProvider";
import { useLanguageContext } from "../../Language/LanguageProvider";
import TaalProfielForm from "../../Shared/Taalportfolio/Form";
import "./styles/overview.css";

const TaalprofielOverview = () => {
  const { currentLanguage } = useLanguageContext();
  const { auth } = useAuthContext();
  const { isLoading, error, mutate } = useMutation();

  const { data: answers, invalidate } = useFetch(
    `/taalprofiel/antwoorden/leerling/${auth.user.id}/taal/${currentLanguage}`
  );

  useEffect(() => {
    invalidate();
  }, [currentLanguage]);

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
            }
          },
        }
      );
    }
  };

  return (
    <>
      {answers.length > 0 && (
        <TaalProfielForm answers={answers} onSubmit={handleSubmit} />
      )}
      {answers.length === 0 && (
        <p className="no-answers">
          Er zijn nog geen vragen voor deze taal beschikbaar.
        </p>
      )}
    </>
  );
};

export default TaalprofielOverview;
