import "../Loading/styles/loading.css"

const Loading = () => {
    return(
        <div className="loading-screen">
            <section className="loading-wrapper">
                <section className="loading-animatie">
                    <div className="loading-border"></div>
                </section>
                <section className="loading-tekst">
                    <h1>Een ogenblik geduld alstublieft...</h1>
                </section>
            </section>
        </div>
    )
}

export default Loading;