import ProductList from "./ProductList";
import { useCallback, useEffect, useState } from "react";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../api";
import "./App.css";
import ProductForm from "./ProductForm";
import useAsync from "../hooks/useAsync";
import Header from "./Header";
import useTranslate from "../hooks/useTranslate";

// LIMIT개씩 불러오기
const LIMIT = 6;

function App() {
  const t = useTranslate();
  const [order, setOrder] = useState("newest");
  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isProductsLoading, productsLoadingError, getProductsAsync] =
    useAsync(getProducts);
  const [isDeleting, deletingError, deleteProductAsync] =
    useAsync(deleteProduct);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleNewestClick = () => setOrder("newest");

  const handleCheapestClick = () => setOrder("priceLowest");

  // 재렌더링 되지 않도록 useCallback을 사용하여 handleLoad 함수를 메모이제이션
  const handleLoad = useCallback(
    async (options) => {
      const newProducts = await getProductsAsync(options);
      if (!newProducts) return;

      if (options.offset === 0) {
        setProducts(newProducts);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      }
      setOffset(options.offset + newProducts.length);
      setHasMore(newProducts.length === LIMIT);
    },
    [getProductsAsync]
  );

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
    const result = await deleteProductAsync(id);
    if (!result) return;

    setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT, search });
  }, [order, search, handleLoad]);

  return (
    <div className="App">
      <Header />
      <div className="body">
        <form onSubmit={handleSearchSubmit}>
          <input name="search" placeholder="검색어를 입력하세요" />
          <button className="search-btn" type="submit">
            {t("search button")}
          </button>
        </form>

        <button
          className={`active-btn${showForm ? " active" : ""}`}
          onClick={handleAddProductClick}
        >
          {t("product registration")}
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
            {t("order newest")}
          </button>
          <button
            className={`active-btn${order === "priceLowest" ? " active" : ""}`}
            onClick={handleCheapestClick}
          >
            {t("order cheapest")}
          </button>
        </div>

        <ProductList
          products={products}
          onDelete={handleDeleteProduct}
          onUpdate={updateProduct}
          onUpdateSuccess={handleUpdateProductSuccess}
        ></ProductList>
        {(isProductsLoading || isDeleting) && <div className="spinner"></div>}
        {hasMore && (
          <button
            className="load-more"
            onClick={handleLoadMore}
            disabled={isProductsLoading}
          >
            {t("load more")}
          </button>
        )}
        {productsLoadingError?.message && (
          <span>{productsLoadingError.message}</span>
        )}
        {deletingError?.message && <span>{deletingError.message}</span>}
      </div>
    </div>
  );
}

export default App;
