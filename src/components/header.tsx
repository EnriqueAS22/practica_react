import { useContext } from "react";
import { logout } from "../auth/service";
import { AuthContext } from "../auth/context";

function Header() {
  const { isLogged, onLogout } = useContext(AuthContext);
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
