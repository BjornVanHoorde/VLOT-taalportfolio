export const Login = () => {
    return(
        <div id="auth">
            <div id="auth-login">
                <form className="auth-form">
                    <h2>Log in met je VLOT-account</h2>
                    <div id="login-user">
                        <label></label>
                        <input type={Text}></input>
                    </div>
                    <div id="login-psw">
                        <label></label>
                        <input type={Text}></input>
                    </div>
                    <button type={SubmitEvent}></button>
                </form>
            </div>
        </div>
    )
}