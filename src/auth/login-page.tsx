import "./login-page.css";
import { useState } from "react";
import { login } from "./service";
import { useAuth } from "./context";
import Button from "../components/ui/button";
import FormField from "../components/ui/form-field";

function LoginPage() {
  const { onLogin } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "user@mail.com",
    password: "1234",
  });
  const { email, password } = credentials;
  const isDisabled = !email || !password;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await login(credentials);
      onLogin();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="login-page">
      <h1 className="login-page-title">Logéate!</h1>
      <form onSubmit={handleSubmit}>
        <FormField
          type="email"
          name="email"
          label="email"
          value={email}
          onChange={handleChange}
        />
        <FormField
          type="password"
          name="password"
          label="password"
          value={password}
          onChange={handleChange}
        />
        <Button
          className="login-form-submit"
          disabled={isDisabled}
          type="submit"
          $variant="primary"
        >
          Log in!
        </Button>
      </form>
    </div>
  );
}

export default LoginPage;
