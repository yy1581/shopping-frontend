import { useState } from "react";
import "./ProductForm.css";

function ProductForm() {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  function sanitize(type, value) {
    switch (type) {
      case "number":
        return Number(value) || "";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      ...values,
      price: Number(values.price),
      stock: Number(values.stock),
    };
    console.log(newProduct);
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">상품명</label>
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
        <div className="form-group">
          <label htmlFor="category">카테고리</label>
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
      <div className="form-group">
        <label htmlFor="description">상품 설명</label>
        <textarea
          id="description"
          name="description"
          placeholder="상품 설명을 입력하세요"
          value={values.description}
          onChange={handleChange}
          rows="5"
        />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="price">가격(원)</label>
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
        <div className="form-group">
          <label htmlFor="stock">재고(개)</label>
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
      <button type="submit" className="submit-button">
        상품 등록
      </button>
    </form>
  );
}

export default ProductForm;
