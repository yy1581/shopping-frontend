import { Link } from "react-router-dom";
import useTranslate from "../hooks/useTranslate";
import "./HomePage.css";

function HomePage() {
  const t = useTranslate();

  return (
    <div className="App">
      <div className="home-body">
        <h1 className="home-title">{t("welcome to ymazon")}</h1>
        <p className="home-subtitle">
          {t("your one stop shop for everything")}
        </p>
        <div className="home-actions">
          <Link to="/products" className="home-button">
            {t("browse products")}
          </Link>
          <Link to="/wishlist" className="home-button">
            {t("my wishlist")}
          </Link>
        </div>
      </div>
    </div>
  );
}
export default HomePage;
