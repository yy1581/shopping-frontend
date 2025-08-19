import { useState } from "react";
import ProductForm from "./ProductForm";
import useTranslate from "../hooks/useTranslate";
import styles from "./ProductRegistration.module.css";

function ProductRegistration({ onSubmit, onSubmitSuccess }) {
  const t = useTranslate();
  const [showForm, setShowForm] = useState(false);

  const handleAddProductClick = () => {
    setShowForm((prev) => !prev);
  };

  const handleSubmitSuccess = (newProduct) => {
    setShowForm(false);
    onSubmitSuccess(newProduct);
  };

  return (
    <>
      <button
        className={`${styles.toggleBtn} ${showForm ? styles.active : ""}`}
        onClick={handleAddProductClick}
      >
        {t("product registration")}
      </button>
      <div className={`${styles.formContainer} ${showForm ? styles.open : ""}`}>
        <ProductForm
          title={t("product registration")}
          onSubmit={onSubmit}
          onSubmitSuccess={handleSubmitSuccess}
        />
      </div>
    </>
  );
}

export default ProductRegistration;
