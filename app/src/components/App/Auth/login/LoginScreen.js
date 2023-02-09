import logo from '../../../../img/logo.svg'

const LoginScreen = () => {
  return(
    <div id="auth">
        <div id="auth-login">
                <img src={logo} alt='logo'/>
            <form className="auth-form">
                <div className='form-item'>
                    <label>VLOT-Gebruikersnaam</label>
                    <input type={Text}></input>
                </div>
                <div className='form-item'>
                    <label>Wachtwoord</label>
                    <input type='password'></input>
                </div>
                <button type={SubmitEvent}>Inloggen</button>
            </form>
        </div>
    </div>
)
};

export default LoginScreen;
