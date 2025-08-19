import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct } from "../api";
import Header from "../components/Header";
import useAsync from "../hooks/useAsync";
import useTranslate from "../hooks/useTranslate";
import "./ProductPage.css";

function ProductPage() {
  const t = useTranslate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isProductLoading, productLoadingError, getProductAsync] =
    useAsync(getProduct);

  useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await getProductAsync(id);
      if (fetchedProduct) {
        setProduct(fetchedProduct);
      }
    };
    fetchProduct();
  }, [id, getProductAsync]);

  if (isProductLoading) {
    return (
      <div className="App">
        <Header />
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (productLoadingError) {
    return (
      <div className="App">
        <Header />
        <div className="error-message">{productLoadingError.message}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="App">
        <Header />
        <div className="error-message">{t("product not found")}</div>
      </div>
    );
  }

  const { name, description, price, stock, category, photoUrl } = product;

  return (
    <div className="App">
      <Header />
      <div className="product-page-container">
        <div className="product-image-container">
          <img src={photoUrl} alt={name} className="product-image" />
        </div>
        <div className="product-details-container">
          <div className="product-category">{t(category)}</div>
          <h1 className="product-name">{name}</h1>
          <p className="product-description">{description}</p>
          <div className="product-price">{`${price.toLocaleString()} ${t(
            "won"
          )}`}</div>
          <div className="product-stock">{`${t("stock")}: ${stock}`}</div>
          <div className="product-actions">
            <button className="add-to-cart-button">{t("add to cart")}</button>
            <Link to="/products" className="back-to-list-button">
              {t("back to list")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
