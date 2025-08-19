import { useState } from "react";
import ProductForm from "./ProductForm";
import "./ProductList.css";
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
    <li className="product-item">
      <Link to={`/products/${id}`} className="product-item-link">
        <span className="product-name">{name}</span>
      </Link>
      <div className="product-category">{t(category) || category}</div>
      <div className="product-price">{`${price.toLocaleString()} ${t(
        "won"
      )}`}</div>
      <div className="product-date">{formatDate(createdAt)}</div>
      <div className="product-actions">
        <button className="product-edit" onClick={handleEditClick}>
          {t("edit button")}
        </button>
        <button className="product-delete" onClick={handleDeleteClick}>
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
    <ul className="product-list">
      {products.map((product) => {
        if (product.id === editingId) {
          return (
            <li key={product.id} className="product-form-item">
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
