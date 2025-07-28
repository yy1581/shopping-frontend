import "./ProductList.css";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function ProductItem({ product, onDelete }) {
  const { id, name, description, price, stock, createdAt } = product;

  const handleDeleteClick = () => onDelete(id);

  return (
    <li className="product-card">
      <div className="product-header">
        <span className="product-name">{name}</span>
      </div>
      <div className="product-date">{formatDate(createdAt)}</div>
      <div className="product-desc">{description}</div>
      <div className="product-info">
        <span className="product-price">{price.toLocaleString()}원</span>
        <span className="product-stock">재고: {stock}개</span>
      </div>
      <button className="product-delete" onClick={handleDeleteClick}>
        삭제
      </button>
    </li>
  );
}

function ProductList({ products, onDelete }) {
  if (!Array.isArray(products)) return null;
  return (
    <ul className="product-list">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default ProductList;
