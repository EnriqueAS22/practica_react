import { logout } from "../auth/service";

export interface HeaderProps {
  isLogged: boolean;
  onLogout: () => void;
}

function Header({ isLogged, onLogout }: HeaderProps) {
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
