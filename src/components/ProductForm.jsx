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

function ProductForm({
  initialValues = INITIAL_VALUES,
  onSubmitSuccess,
  onSubmit,
  onCancel,
}) {
  const t = useTranslate();
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, submitError, onSubmitAsync] = useAsync(onSubmit);

  // 문자열을 숫자로 변환하는 함수
  function sanitize(type, value) {
    switch (type) {
      case "number":
        return Number(value) || 0;

      default:
        return value;
    }
  }

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: sanitize(type, value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      ...values,
      price: Number(values.price),
      stock: Number(values.stock),
    };

    const createdProduct = await onSubmitAsync(newProduct);
    if (!createdProduct) return;

    onSubmitSuccess(createdProduct);
    setValues(INITIAL_VALUES);
  };

  return (
    <form className={styles.productForm} onSubmit={handleSubmit}>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="name">{t("product name")}</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="상품명을 입력하세요"
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
              카테고리를 선택하세요
            </option>
            <option value="FASHION">패션</option>
            <option value="BEAUTY">뷰티</option>
            <option value="SPORTS">스포츠</option>
            <option value="ELECTRONICS">전자제품</option>
            <option value="HOME_INTERIOR">홈인테리어</option>
            <option value="HOUSEHOLD_SUPPLIES">생활용품</option>
            <option value="KITCHENWARE">주방용품</option>
          </select>
        </div>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="description">{t("product description")}</label>
        <textarea
          id="description"
          name="description"
          placeholder="상품 설명을 입력하세요"
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
            placeholder="가격을 입력하세요"
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
            placeholder="재고 수량을 입력하세요"
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
