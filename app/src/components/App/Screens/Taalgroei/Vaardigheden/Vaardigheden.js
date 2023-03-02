const Vaardigheden = () => {
    return (
        <div className="taalgroei-sequence">
            <div className="taalgroei-nav">
                <nav>
                    <button className="taalgroei-nav-button">Spreken</button>
                    <button className="taalgroei-nav-button">Schrijven</button>
                    <button className="taalgroei-nav-button">Lezen</button>
                    <button className="taalgroei-nav-button">Luisteren</button>
                </nav>
            </div>
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
                </div>
            </div>
        </div>
    )
}

export default Vaardigheden;