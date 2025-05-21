import { useState } from "react";
import LoginPage from "./auth/login-page";
import AdvertPage from "./pages/adverts-page";

interface AppProps {
  defaultIsLogged: boolean;
}

function App({ defaultIsLogged }: AppProps) {
  const [isLogged, setIsLogged] = useState(defaultIsLogged);

  function handleLogin() {
    setIsLogged(true);
  }
  function handleLogout() {
    setIsLogged(false);
  }

  return isLogged ? (
    <AdvertPage onLogout={handleLogout} />
  ) : (
    <LoginPage onLogin={handleLogin} />
  );
}

export default App;
