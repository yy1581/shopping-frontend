import ProductList from "./component/ProductList";
import { useEffect, useState } from "react";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "./api";
import "./App.css";
import ProductForm from "./component/ProductForm";
import useAsync from "./hooks/useAsync";

const LIMIT = 6;

function App() {
  const [order, setOrder] = useState("newest");
  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, loadingError, getProductsAsync] = useAsync(getProducts);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleNewestClick = () => setOrder("newest");

  const handleCheapestClick = () => setOrder("priceLowest");

  const handleLoad = async (options) => {
    const newProducts = await getProductsAsync(options);
    if (!newProducts) return;

    if (options.offset === 0) {
      setProducts(newProducts);
    } else {
      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
    }
    setOffset(options.offset + newProducts.length);
    setHasMore(newProducts.length === LIMIT);
  };

  const handleLoadMore = () => {
    handleLoad({ order, offset, limit: LIMIT, search });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target["search"].value);
  };

  const handleAddProductClick = () => {
    setShowForm((prev) => !prev);
  };

  const handleCreateProductSuccess = (newProduct) => {
    setProducts((prevProducts) => [newProduct, ...prevProducts]);
    setShowForm(false);
  };

  const handleUpdateProductSuccess = (updatedProduct) => {
    setProducts((prevProducts) => {
      const index = prevProducts.findIndex(
        (product) => product.id === updatedProduct.id
      );
      return [
        ...prevProducts.slice(0, index),
        updatedProduct,
        ...prevProducts.slice(index + 1),
      ];
    });
  };

  const handleDeleteProduct = async (id) => {
    const result = await deleteProduct(id);

    setProducts((prevProducts) =>
      prevProducts.filter((product) => id !== product.id)
    );
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT, search });
  }, [order, search]);

  return (
    <div className="App">
      <form onSubmit={handleSearchSubmit}>
        <input name="search" placeholder="검색어를 입력하세요" />
        <button className="search-btn" type="submit">
          검색
        </button>
      </form>

      <button
        className={`active-btn${showForm ? " active" : ""}`}
        onClick={handleAddProductClick}
      >
        상품 등록
      </button>
      <div className={`product-form-container${showForm ? " open" : ""}`}>
        <ProductForm
          onSubmit={createProduct}
          onSubmitSuccess={handleCreateProductSuccess}
        />
      </div>

      <div className="order-buttons">
        <button
          className={`active-btn${order === "newest" ? " active" : ""}`}
          onClick={handleNewestClick}
        >
          최신순
        </button>
        <button
          className={`active-btn${order === "priceLowest" ? " active" : ""}`}
          onClick={handleCheapestClick}
        >
          낮은 가격순
        </button>
      </div>

      <ProductList
        products={products}
        onDelete={handleDeleteProduct}
        onUpdate={updateProduct}
        onUpdateSuccess={handleUpdateProductSuccess}
      ></ProductList>
      {isLoading && <div className="spinner"></div>}
      {hasMore && (
        <button
          className="load-more"
          onClick={handleLoadMore}
          disabled={isLoading}
        >
          더 보기
        </button>
      )}
      {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
  );
}

export default App;
