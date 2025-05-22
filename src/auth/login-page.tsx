import { useState } from "react";
import { login } from "./service";
import { useAuth } from "./context";

function LoginPage() {
  const { onLogin } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "user@mail.com",
    password: "1234",
  });
  const { email, password } = credentials;
  const disabled = !email || !password;

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
    <div>
      <h1>Logéate!</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </label>
        <button type="submit" disabled={disabled}>
          Log in!
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
