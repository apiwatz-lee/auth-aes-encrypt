import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import UploadProductPage from "./pages/UploadProductPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductCartPage from "./pages/ProductCartPage";
import Homepage from "./pages/Homepage";
import PageNotFoud from "./pages/PageNotFoud";
import LoginPage from "./pages/LoginPage";
import { useAuth } from "./context/Authentication";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Homepage />} />
            <Route path="/product" element={<ProductListPage />} />
            <Route path="/product/upload/" element={<UploadProductPage />} />
            <Route path="/product/upload/:id" element={<UploadProductPage />} />
            <Route
              path="/product/detail/:id"
              element={<ProductDetailsPage />}
            />
            <Route path="/product/cart" element={<ProductCartPage />} />
            <Route
              path="/payment/checkout-success"
              element={<CheckoutSuccess />}
            />
            <Route path="*" element={<PageNotFoud />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Homepage />} />
            <Route path="/product" element={<ProductListPage />} />
            <Route path="/product/cart" element={<ProductCartPage />} />
            <Route
              path="/product/detail/:id"
              element={<ProductDetailsPage />}
            />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/signin" element={<LoginPage />} />
            <Route path="*" element={<PageNotFoud />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
