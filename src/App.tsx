import LoginPage from "./auth/login-page";
import AdvertPage from "./pages/adverts-page";
import { useAuth } from "./auth/context";

function App() {
  const { isLogged } = useAuth();
  return isLogged ? <AdvertPage /> : <LoginPage />;
}

export default App;
