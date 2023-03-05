import verwijder from "../../../../../img/delete.svg";

const newButton = () => {

}

const Vaardigheden = () => {
    return (
        <div className="taalgroei-sequence">
            <div className="taalgroei-nav">
                <nav>
                    <button className="taalgroei-nav-button"><p>Spreken</p></button>
                    <button className="taalgroei-nav-button"><p>Schrijven</p></button>
                    <button className="taalgroei-nav-button"><p>Lezen</p></button>
                    <button className="taalgroei-nav-button"><p>Luisteren</p></button>
                </nav>
            </div>
            <div className="lijn"></div>
            <div className="vaardigheden-content">
                <div className="evaluatie-sidebar">
                    <div className="evaluatie-add">
                        <div className="evaluatie-add-tekst">
                            <span>Evaluatie toevoegen</span>
                        </div>
                        <div className="evaluatie-add-plus">
                            <strong>+</strong>
                        </div>
                    </div>
                    <div className="evaluatie-item">
                        <div className="evaluatie-item-content">
                            <span>Evaluatie 1</span>
                            <div className="evaluatie-delete">
                                <img src={verwijder} alt='delete'></img>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content">
                    {/* <h3 className="no-content">Er werden nog geen evaluaties aangemaakt</h3> */}
                    <div className="taalgroei-form">
                        <div className="taalgroei-form-item">
                            <p>Je schrijft en vlot leesbare tekst</p>
                            <select value="2">
                                <option selected className="value-blank" value="blank"></option>
                                <option className="value-0" value="0"></option>
                                <option className="value-1" value="1"></option>
                                <option className="value-2" value="2"></option>
                            </select>
                        </div>
                    </div>
                    <div className="taalgroei-feedback">
                        <h3>feedback of opmerkingen</h3>
                        <input type="text"></input>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Vaardigheden;