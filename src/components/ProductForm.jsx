import { useState } from "react";
import styles from "./ProductForm.module.css";
import useAsync from "../hooks/useAsync";
import useTranslate from "../hooks/useTranslate";

const INITIAL_VALUES = {
  name: "",
  description: "",
  price: "",
  stock: "",
  category: "",
};

const CATEGORIES = [
  "FASHION",
  "BEAUTY",
  "SPORTS",
  "ELECTRONICS",
  "HOME_INTERIOR",
  "HOUSEHOLD_SUPPLIES",
  "KITCHENWARE",
];

function ProductForm({
  initialValues = INITIAL_VALUES,
  onSubmitSuccess,
  onSubmit,
  onCancel,
  title,
}) {
  const t = useTranslate();
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, submitError, onSubmitAsync] = useAsync(onSubmit);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      ...values,
      price: Number(values.price) || 0,
      stock: Number(values.stock) || 0,
    };

    const createdProduct = await onSubmitAsync(newProduct);
    if (!createdProduct) return;

    onSubmitSuccess(createdProduct);
    setValues(INITIAL_VALUES);
  };

  return (
    <form className={styles.productForm} onSubmit={handleSubmit}>
      {title && <h2 className={styles.formTitle}>{title}</h2>}
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="name">{t("product name")}</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder={t("product name placeholder")}
            value={values.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="category">{t("product category")}</label>
          <select
            id="category"
            name="category"
            value={values.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              {t("product category placeholder")}
            </option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {t(category)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="description">{t("product description")}</label>
        <textarea
          id="description"
          name="description"
          placeholder={t("product description placeholder")}
          value={values.description}
          onChange={handleChange}
          rows="5"
        />
      </div>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="price">{t("product price")}</label>
          <input
            id="price"
            name="price"
            type="number"
            placeholder={t("product price placeholder")}
            value={values.price}
            onChange={handleChange}
            min="0"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="stock">{t("product stock")}</label>
          <input
            id="stock"
            name="stock"
            type="number"
            placeholder={t("product stock placeholder")}
            value={values.stock}
            onChange={handleChange}
            min="0"
            required
          />
        </div>
      </div>
      <div className={styles.formActions}>
        {onCancel && (
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onCancel}
          >
            {t("cancel button")}
          </button>
        )}
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {t("confirm button")}
        </button>
      </div>
      {submitError?.message && (
        <div className={styles.errorMessage}>{submitError.message}</div>
      )}
    </form>
  );
}

export default ProductForm;
