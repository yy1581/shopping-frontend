import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductListPage from "./pages/ProductListPage";
import ProductPage from "./pages/ProductPage";
import WishListPage from "./pages/WishListPage";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/wishlist" element={<WishListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
