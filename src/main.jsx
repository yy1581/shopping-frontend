import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductListPage from "./pages/ProductListPage";
import WishListPage from "./pages/WishListPage";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/wishlist" element={<WishListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
