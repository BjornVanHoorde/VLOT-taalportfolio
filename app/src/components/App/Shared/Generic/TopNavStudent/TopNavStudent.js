import TopNavLanguages from "../../../../../core/constants/TopNavLanguages";
import LanguageButton from "../../../../Design/Button/styles/LanguageButton";
import "./styles/topbar.css";


const TopNavStudent = () => {
    
    return (
        <div className="top-nav">
            {
                TopNavLanguages.map((language) => (
                    <LanguageButton label={language.label} key={language.label} />
                ))
            }
        </div>
    )
}

export default TopNavStudent;