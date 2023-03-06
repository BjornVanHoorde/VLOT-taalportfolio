import useMutation from "../../../../core/hooks/useMutation";
import logo from "../../../../img/logo.svg";
import { useAuthContext } from "../AuthProvider";
import useForm from "../../../../core/hooks/useForm";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const defaultData = {
  email: "",
  password: "",
};

const LoginScreen = () => {
  const { login } = useAuthContext();
  const { isLoading, error, mutate } = useMutation();

  const { values, errors, handleChange, handleSubmit } = useForm(schema, {
    ...defaultData,
  });

  const handleData = (values) => {
    mutate(`${process.env.REACT_APP_API_URL}/login`, {
      method: "POST",
      data: values,
      onSuccess: (data) => {
        login(data);
      },
    });
  };

  return (
    <div id="auth">
      <div id="auth-login">
        <img src={logo} alt="logo" />
        <h2>Aanmelden:</h2>
        <form
          className="auth-form"
          onSubmit={handleSubmit(handleData)}
          noValidate
        >
          {error && <div className="error">{error}</div>}
          <div className="form-item">
            <label>Gebruikersnaam of e-mail:</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={values.email}
              error={errors.email}
              disabled={isLoading}
            ></input>
          </div>
          <div className="form-item">
            <label>Wachtwoord:</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={values.password}
              error={errors.password}
              disabled={isLoading}
            ></input>
          </div>
          <button>Inloggen</button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
