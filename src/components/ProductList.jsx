import { useState } from "react";
import ProductForm from "./ProductForm";
import styles from "./ProductList.module.css";
import useTranslate from "../hooks/useTranslate";
import { Link } from "react-router-dom";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function ProductItem({ product, onDelete, onEdit }) {
  const t = useTranslate();
  const { id, name, price, createdAt, category } = product;

  const handleDeleteClick = () => onDelete(id);
  const handleEditClick = () => onEdit(id);
  return (
    <li className={styles.productItem}>
      <Link to={`/products/${id}`} className={styles.productItemLink}>
        <span className={styles.productName}>{name}</span>
      </Link>
      <div className={styles.productCategory}>{t(category) || category}</div>
      <div className={styles.productPrice}>{`${price.toLocaleString()} ${t(
        "won"
      )}`}</div>
      <div className={styles.productDate}>{formatDate(createdAt)}</div>
      <div className={styles.productActions}>
        <button className={styles.productEdit} onClick={handleEditClick}>
          {t("edit button")}
        </button>
        <button className={styles.productDelete} onClick={handleDeleteClick}>
          {t("delete button")}
        </button>
      </div>
    </li>
  );
}

function ProductList({ products, onDelete, onUpdate, onUpdateSuccess }) {
  const [editingId, setEditingId] = useState(null);
  if (!Array.isArray(products)) return null;

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleSubmit = (productData) => onUpdate(productData.id, productData);

  const handleSubmitSuccess = (updatedProduct) => {
    onUpdateSuccess(updatedProduct);
    setEditingId(null);
  };

  return (
    <ul className={styles.productList}>
      {products.map((product) => {
        if (product.id === editingId) {
          return (
            <li key={product.id} className={styles.productFormItem}>
              <ProductForm
                initialValues={product}
                onSubmit={handleSubmit}
                onSubmitSuccess={handleSubmitSuccess}
                onCancel={handleCancel}
              />
            </li>
          );
        }
        return (
          <ProductItem
            key={product.id}
            product={product}
            onDelete={onDelete}
            onEdit={setEditingId}
          />
        );
      })}
    </ul>
  );
}

export default ProductList;
