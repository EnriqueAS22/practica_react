import "./header.css";
import AuthButton from "../ui/auth-button";
import { Link, NavLink } from "react-router";

function Header() {
  return (
    <header className="header">
      <Link to="/">
        <div>NODEPOP</div>
      </Link>
      <nav className="header-nav">
        <NavLink to="/adverts/new">New</NavLink>
        <NavLink to="/adverts" end>
          Latest
        </NavLink>
        <AuthButton />
      </nav>
    </header>
  );
}

export default Header;
