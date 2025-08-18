import { useState } from "react";
import ProductForm from "./ProductForm";
import "./ProductList.css";
import useTranslate from "../hooks/useTranslate";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

const CATEGORY_MAP = {
  FASHION: "패션",
  BEAUTY: "뷰티",
  SPORTS: "스포츠",
  ELECTRONICS: "전자제품",
  HOME_INTERIOR: "홈인테리어",
  HOUSEHOLD_SUPPLIES: "생활용품",
  KITCHENWARE: "주방용품",
};

function ProductItem({ product, onDelete, onEdit }) {
  const t = useTranslate();
  const { id, name, description, price, stock, createdAt, category } = product;

  const handleDeleteClick = () => onDelete(id);
  const handleEditClick = () => onEdit(id);

  return (
    <li className="product-card">
      <div className="product-header">
        <span className="product-name">{name}</span>
        <div className="product-category">
          {CATEGORY_MAP[category] || category}
        </div>
      </div>
      <div className="product-date">{formatDate(createdAt)}</div>
      <div className="product-desc">{description}</div>
      <div className="product-info">
        <span className="product-price">
          {`${price.toLocaleString()} ${t("won")}`}
        </span>
        <span className="product-stock">
          {t("stock")}: {stock}
        </span>
      </div>
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
            <ProductForm
              key={product.id}
              product={product}
              onDelete={onDelete}
              initialValues={product}
              onSubmit={handleSubmit}
              onSubmitSuccess={handleSubmitSuccess}
              onCancel={handleCancel}
            />
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
