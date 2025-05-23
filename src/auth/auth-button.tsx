import { logout } from "../auth/service";
import { useAuth } from "../auth/context";
import Button from "../components/ui/button";

export default function AuthButton() {
  const { isLogged, onLogout } = useAuth();
  const handleLogoutClock = async () => {
    await logout();
    onLogout();
  };
  return isLogged ? (
    <Button $variant="primary" onClick={handleLogoutClock}>
      Logout
    </Button>
  ) : (
    <button>Login</button>
  );
}
