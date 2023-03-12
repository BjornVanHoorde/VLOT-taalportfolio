import { useEffect } from "react";
<<<<<<< HEAD:app/src/components/App/Screens/Taalprofiel/TaalprofielScreen.js
import useFetch from "../../../../core/hooks/useFetch";
import Loading from "../../../Design/Loading/Loading";
import { useAuthContext } from "../../Auth/AuthProvider";
import { useLanguageContext } from "../../Language/LanguageProvider";
import { useYearContext } from "../../Year/YearProvider";
import TaalprofielOverview from "./overview";
import Nederlands from "../../../../img/nederlands.png";
import Frans from "../../../../img/frans.png";

=======
import useFetch from "../../../../../core/hooks/useFetch";
import Loading from "../../../../Design/Loading/Loading";
import { useAuthContext } from "../../../Auth/AuthProvider";
import { useLanguageContext } from "../../../Language/LanguageProvider";
import { useYearContext } from "../../../Year/YearProvider";
import TaalprofielOverview from "./TaalprofielOverview";
import nederlands from "../../../../../img/nederlands.png";
>>>>>>> a871ad54b169b42ca8b1b1f1885dde025f68a72d:app/src/components/App/Screens/Student/Taalprofiel/TaalprofielScreen.js
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
          <img src={currentLanguage} alt="vlag" width="100%"></img>
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
