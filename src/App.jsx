import ProductList from "./component/ProductList";
import { useEffect, useState } from "react";
import { getProducts } from "./api";
import "./App.css";
import ProductForm from "./component/ProductForm";

const LIMIT = 6;

function App() {
  const [order, setOrder] = useState("newest");
  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleNewestClick = () => setOrder("newest");

  const handleCheapestClick = () => setOrder("priceLowest");

  const handleDelete = async (id) => {
    const nextProducts = products.filter((product) => product.id !== id);
    setProducts(nextProducts);
  };

  const handleLoad = async (options) => {
    let newProducts;
    try {
      setIsLoading(true);
      setLoadingError(null);
      newProducts = await getProducts(options);
    } catch (e) {
      setLoadingError(e);
      return;
    } finally {
      setIsLoading(false);
    }
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

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT, search });
  }, [order, search]);

  return (
    <div className="App">
      <form onSubmit={handleSearchSubmit}>
        <input name="search" placeholder="검색어를 입력하세요" />
        <button type="submit">검색</button>
      </form>

      <button
        className={`active-btn${showForm ? " active" : ""}`}
        onClick={handleAddProductClick}
      >
        상품 등록
      </button>
      <div className={`product-form-container${showForm ? " open" : ""}`}>
        <ProductForm />
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

      <ProductList products={products} onDelete={handleDelete}></ProductList>
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
