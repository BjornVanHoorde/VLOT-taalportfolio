import { useAuthContext } from "../../Auth/AuthProvider";
import no_picture from "../../../../img/no_picture.svg";

const Userdetails = () => {

    const {auth} = useAuthContext();

    return(
        <div className="details">
            <h2>Profiel</h2>
            <div className="details-card">
                <div className="details-picture">
                    <img src={no_picture} alt="profielfoto"></img>
                </div>
                <div className="segment-container">
                    <div className="details-segment">
                        <span>Naam</span>
                        <p>{auth.user.voornaam} {auth.user.achternaam}</p>
                    </div>
                    <div className="details-segment">
                        <span>Klasnummer</span>
                        <p>{auth.user.id}</p>
                    </div>
                    <div className="details-segment">
                        <span>Leerstoornissen</span>
                        <p>Affasie</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Userdetails;