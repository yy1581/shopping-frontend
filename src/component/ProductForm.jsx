import { useState } from "react";
import "./ProductForm.css";

function ProductForm() {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <form className="product-card product-form" onSubmit={handleSubmit}>
      <div className="product-header">
        <input
          name="name"
          type="text"
          placeholder="상품명을 입력하세요"
          value={values.name}
          className="product-name"
          onChange={handleChange}
        />
        <select
          name="category"
          value={values.category}
          className="product-category"
          onChange={handleChange}
        >
          <option value="">카테고리를 선택하세요</option>
          <option value="FASHION">패션</option>
          <option value="BEAUTY">뷰티</option>
          <option value="SPORTS">스포츠</option>
          <option value="ELECTRONICS">전자제품</option>
          <option value="HOME_INTERIOR">홈인테리어</option>
          <option value="HOUSEHOLD_SUPPLIES">생활용품</option>
          <option value="KITCHENWARE">주방용품</option>
        </select>
      </div>
      <textarea
        name="description"
        placeholder="상품 설명을 입력하세요"
        value={values.description}
        className="product-desc"
        onChange={handleChange}
      />
      <div className="product-info">
        <input
          name="price"
          type="number"
          className="product-price"
          value={values.price}
          onChange={handleChange}
        />
        <input
          name="stock"
          type="number"
          className="product-stock"
          value={values.stock}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="product-submit">
        상품 등록
      </button>
    </form>
  );
}

export default ProductForm;
