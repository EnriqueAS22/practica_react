import { logout } from "../../pages/auth/service";
import { useAuth } from "../../pages/auth/context";
import Button from "./button";
import { Link } from "react-router";

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
    <Button $variant="primary" as={Link} to="/login">
      Login
    </Button>
  );
}
