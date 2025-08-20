import ProductList from "../components/ProductList";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../api";
import useAsync from "../hooks/useAsync";
import useTranslate from "../hooks/useTranslate";
import SearchForm from "../components/SearchForm";
import ProductRegistration from "../components/ProductRegistration";
import "./ProductListPage.css";

// LIMIT개씩 불러오기
const LIMIT = 6;

function ProductListPage() {
  const t = useTranslate();
  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isProductsLoading, productsLoadingError, getProductsAsync] =
    useAsync(getProducts);
  const [isDeleting, deletingError, deleteProductAsync] =
    useAsync(deleteProduct);
  const [searchParams, setSearchParams] = useSearchParams();
  const order = searchParams.get("order") || "newest";
  const keyword = searchParams.get("keyword") || "";

  const handleOrderChange = (newOrder) => {
    searchParams.set("order", newOrder);
    setSearchParams(searchParams);
  };

  const handleNewestClick = () => handleOrderChange("newest");

  const handleCheapestClick = () => handleOrderChange("priceLowest");
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
    handleLoad({ order, offset, limit: LIMIT, search: keyword });
  };

  const handleCreateProductSuccess = (newProduct) => {
    setProducts((prevProducts) => [newProduct, ...prevProducts]);
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

  const handleSearchSubmit = (newKeyword) => {
    if (newKeyword) {
      searchParams.set("keyword", newKeyword);
    } else {
      searchParams.delete("keyword");
    }
    setSearchParams(searchParams);
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT, search: keyword });
  }, [order, keyword, handleLoad]);

  return (
    <div className="App">
      <div className="body">
        <SearchForm initialValue={keyword} onSubmit={handleSearchSubmit} />

        <ProductRegistration
          onSubmit={createProduct}
          onSubmitSuccess={handleCreateProductSuccess}
        />

        <div className="order-buttons">
          <button
            className={`order-btn ${order === "newest" ? "active" : ""}`}
            onClick={handleNewestClick}
          >
            {t("order newest")}
          </button>
          <button
            className={`order-btn ${order === "priceLowest" ? "active" : ""}`}
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

export default ProductListPage;
