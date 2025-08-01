import "./ProductList.css";

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

function ProductItem({ product, onDelete }) {
  const { id, name, description, price, stock, createdAt, category } = product;

  const handleDeleteClick = () => onDelete(id);

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
