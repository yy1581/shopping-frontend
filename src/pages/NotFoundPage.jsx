import { Link } from "react-router-dom";
import useTranslate from "../hooks/useTranslate";
import styles from "./NotFoundPage.module.css";

function NotFoundPage() {
  const t = useTranslate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.subtitle}>{t("page not found")}</p>
        <p className={styles.description}>
          {t("The page you are looking for does not exist or has been moved.")}
        </p>
        <Link to="/" className={styles.homeButton}>
          {t("go to homepage")}
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
