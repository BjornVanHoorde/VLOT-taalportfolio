const Navigation = () => {
    return (
    <div id='sidebar-components'>
        <nav id='main-nav'>
            <li>Taalprofiel</li>
            <li>Taaldossier</li>
            <li>Taalgroei</li>
                <nav id='sub-nav'>
                    <li>Vaardigheden</li>
                    <li>Foutanalyse</li>
                    <li>Woordenschat</li>
                    <li>Taaltips</li>
                </nav>
        </nav>
    </div>
    )
}

export default Navigation;