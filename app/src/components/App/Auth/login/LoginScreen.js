import useMutation from "../../../../core/hooks/useMutation";
import logo from "../../../../img/logo.svg";
import { useAuthContext } from "../AuthProvider";
import useForm from "../../../../core/hooks/useForm";
import * as yup from "yup";
import Label from "../../../Design/Form/Label";
import Input from "../../../Design/Form/Input";
import "../login/styles/auth.css";

// validation schema
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

  // handle submit
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
            <Label htmlFor="email" className="auth-label">
              Gebruikersnaam of e-mail:
            </Label>
            <Input
              type="email"
              name="email"
              className="auth-input"
              onChange={handleChange}
              value={values.email}
              error={errors.email}
              disabled={isLoading}
            />
          </div>
          <div className="form-item">
            <Label htmlFor="password" className="auth-label">
              Wachtwoord:
            </Label>
            <Input
              className="auth-input"
              type="password"
              name="password"
              onChange={handleChange}
              value={values.password}
              error={errors.password}
              disabled={isLoading}
            />
          </div>
          <button>Inloggen</button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
