import "./header.css";
import AuthButton from "../../auth/auth-button";

function Header() {
  return (
    <header className="header">
      <div>NODEPOP</div>
      <nav className="header-nav">
        <AuthButton />
      </nav>
    </header>
  );
}

export default Header;
