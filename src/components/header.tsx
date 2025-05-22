import { logout } from "../auth/service";
import { useAuth } from "../auth/context";

function Header() {
  const { isLogged, onLogout } = useAuth();
  const handleLogoutClock = async () => {
    await logout();
    onLogout();
  };

  return (
    <header>
      <div></div>
      <nav>
        {isLogged ? (
          <button onClick={handleLogoutClock}>Logout</button>
        ) : (
          <button>Login</button>
        )}
      </nav>
    </header>
  );
}

export default Header;
