import { useEffect } from "react";
import useFetch from "../../../../core/hooks/useFetch";
import Loading from "../../../Design/Loading/Loading";
import { useAuthContext } from "../../Auth/AuthProvider";
import { useLanguageContext } from "../../Language/LanguageProvider";
import { useYearContext } from "../../Year/YearProvider";
import TaalprofielOverview from "./overview";
import nederlands from "../../../../img/nederlands.png";
import "./styles/TaalprofielScreen.css";

const TaalprofielScreen = () => {
  const { auth } = useAuthContext();
  const { currentLanguage } = useLanguageContext();
  const { selectedYear } = useYearContext();

  // Fetch data based on the user, language and year
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

  // Overview screen
  if (answers && answers.length > 0) {
    return (
      <>
        <TaalprofielOverview answers={answers} handleChange={invalidate} />
        <section className="vlag">
          <img src={nederlands} alt="vlag" width="100%"></img>
        </section>
      </>
    );
  }

  // Loading screen
  if (isLoading) {
    return <Loading />;
  }

  // No answers screen
  if (answers.length === 0 || !answers) {
    return (
      <p className="no-answers">
        Er zijn nog geen vragen voor deze taal beschikbaar...
      </p>
    );
  }
};

export default TaalprofielScreen;
