import { useEffect } from "react";
import useFetch from "../../../../core/hooks/useFetch";
import { useAuthContext } from "../../Auth/AuthProvider";
import { useLanguageContext } from "../../Language/LanguageProvider";
import TaalProfielForm from "../../Shared/Taalportfolio/Form";
import "./styles/overview.css";

const TaalprofielOverview = () => {
  const { currentLanguage } = useLanguageContext();
  const { auth } = useAuthContext();

  const { data: answers, invalidate } = useFetch(
    `/taalprofiel/antwoorden/leerling/${auth.user.id}/taal/${currentLanguage}`
  );

  useEffect(() => {
    invalidate();
  }, [currentLanguage]);

  return <>{answers && <TaalProfielForm answers={answers} />}</>;
};

export default TaalprofielOverview;
