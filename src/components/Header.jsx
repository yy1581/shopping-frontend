import { Link, NavLink } from "react-router-dom";
import LocaleSelector from "./LocaleSelector";
import "./Header.css";
import useTranslate from "../hooks/useTranslate";
import UserMenu from "./UserMenu";

function Header() {
  const t = useTranslate();

  return (
    <header className="App-header">
      <div className="header-content">
        <Link to="/" className="logo-link">
          <h1 className="header-title">Ymazon</h1>
        </Link>
        <nav className="header-nav">
          <NavLink
            to="/products"
            className={({ isActive }) =>
              "header-nav-link" + (isActive ? " active" : "")
            }
          >
            {t("products")}
          </NavLink>
          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              "header-nav-link" + (isActive ? " active" : "")
            }
          >
            {t("my wishlist")}
          </NavLink>
          <UserMenu />
          <LocaleSelector />
        </nav>
      </div>
    </header>
  );
}

export default Header;
