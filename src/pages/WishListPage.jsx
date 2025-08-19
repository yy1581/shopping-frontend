import useTranslate from "../hooks/useTranslate";
import "./WishListPage.css";

function WishListPage() {
  const t = useTranslate();

  return (
    <div className="App">
      <div className="wishlist-body">
        <h1 className="wishlist-title">{t("my wishlist")}</h1>
        <p className="wishlist-empty">{t("Your wishlist is empty.")}</p>
      </div>
    </div>
  );
}

export default WishListPage;
