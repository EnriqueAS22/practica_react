import "./login-page.css";
import { useState } from "react";
import { login } from "./service";
import { useAuth } from "./context";
import Button from "../../components/ui/button";
import FormField from "../../components/ui/form-field";
import { useLocation, useNavigate } from "react-router";
import { AxiosError } from "axios";

function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { onLogin } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [error, setError] = useState<{ message: string } | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const { email, password, remember } = credentials;
  const isDisabled = !email || !password || isFetching;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsFetching(true);
      await login(credentials);
      onLogin();
      //Navigate to -
      const to = location.state?.from ?? "/";
      navigate(to, { replace: true });
    } catch (error) {
      if (error instanceof AxiosError) {
        setError({
          message: error.response?.data?.message ?? error.message ?? "",
        });
      }
    } finally {
      setIsFetching(false);
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
        <div className="flex items-center">
          <input
            id="remember"
            type="checkbox"
            name="remember"
            checked={remember}
            onChange={(event) =>
              setCredentials({
                email,
                password,
                remember: event.target.checked,
              })
            }
            className="border-border text-primary focus:ring-primary h-4 w-4 rounded"
          />
          <label htmlFor="remember" className="text-text ml-2 block text-sm">
            Remember
          </label>
        </div>
        <Button
          className="login-form-submit"
          disabled={isDisabled}
          type="submit"
          $variant="primary"
        >
          Log in!
        </Button>
      </form>
      {error && (
        <div
          className="login-page-error"
          role="alert"
          onClick={() => {
            setError(null);
          }}
        >
          {error.message}
        </div>
      )}
    </div>
  );
}

export default LoginPage;
