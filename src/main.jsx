import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductListPage from "./pages/ProductListPage";
import ProductPage from "./pages/ProductPage";
import WishListPage from "./pages/WishListPage";
import App from "./components/App";

function Main() {
  return (
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="products">
              <Route index element={<ProductListPage />} />
              <Route path=":id" element={<ProductPage />} />
            </Route>
            <Route path="wishlist" element={<WishListPage />} />
          </Route>
        </Routes>
      </App>
    </BrowserRouter>
  );
}

export default Main;
