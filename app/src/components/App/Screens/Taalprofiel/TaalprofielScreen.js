import { useEffect } from "react";
import useFetch from "../../../../core/hooks/useFetch";
import { useAuthContext } from "../../Auth/AuthProvider";
import { useLanguageContext } from "../../Language/LanguageProvider";
import TaalprofielOverview from "./overview";
import "./styles/TaalprofielScreen.css";

const TaalprofielScreen = () => {
  const { auth } = useAuthContext();
  const { currentLanguage, selectedYear } = useLanguageContext();

  const {
    data: answers,
    invalidate,
    isLoading,
  } = useFetch(
    `/taalprofiel/antwoorden/leerling/${auth.user.id}/taal/${
      currentLanguage.split(" ")[0]
    }/${selectedYear}`
  );

  useEffect(() => {
    invalidate();
  }, [currentLanguage, selectedYear]);

  if (answers && answers.length > 0) {
    return <TaalprofielOverview answers={answers} handleChange={invalidate} />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (answers.length === 0 || !answers) {
    return (
      <p className="no-answers">
        Er zijn nog geen vragen voor deze taal beschikbaar...
      </p>
    );
  }
};

export default TaalprofielScreen;
