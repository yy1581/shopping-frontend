import { Link, NavLink } from "react-router-dom";
import LocaleSelector from "./LocaleSelector";
import styles from "./Header.module.css";
import useTranslate from "../hooks/useTranslate";
import UserMenu from "./UserMenu";

function Header() {
  const t = useTranslate();

  return (
    <header className={styles.appHeader}>
      <div className={styles.headerContent}>
        <Link to="/" className={styles.logoLink}>
          <h1 className={styles.headerTitle}>Ymazon</h1>
        </Link>
        <nav className={styles.headerNav}>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `${styles.headerNavLink} ${isActive ? styles.active : ""}`
            }
          >
            {t("products")}
          </NavLink>
          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              `${styles.headerNavLink} ${isActive ? styles.active : ""}`
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
