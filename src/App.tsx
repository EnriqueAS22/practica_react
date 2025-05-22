import { useState } from "react";
import LoginPage from "./auth/login-page";
import AdvertPage from "./pages/adverts-page";
import { AuthContext } from "./auth/context";

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

  const authValue = {
    isLogged,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return (
    <AuthContext.Provider value={authValue}>
      {isLogged ? <AdvertPage /> : <LoginPage />}
    </AuthContext.Provider>
  );
}

export default App;
