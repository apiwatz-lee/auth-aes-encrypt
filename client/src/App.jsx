import { useState, createContext } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import UploadProductPage from "./pages/UploadProductPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import { ChakraProvider } from "@chakra-ui/react";
import ProductCartPage from "./pages/ProductCartPage";
import Homepage from "./pages/Homepage";
import PageNotFoud from "./pages/PageNotFoud";
import LoginPage from "./pages/LoginPage";
import { useAuth } from "./context/Authentication";
import RegisterPage from "./pages/RegisterPage";

export const AppContext = createContext(null);

function App() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [avatars, setAvatars] = useState([]);
  const [isCancel, setIsCancel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isUploadCompleted, setIsUploadCompleted] = useState(false);
  const [isUpdatedCompleted, setIsUpdatedCompleted] = useState(false);
  const [isDeleteCompleted, setIsDeleteCompleted] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { isAuthenticated } = useAuth();

  return (
    <>
      <AppContext.Provider
        value={{
          name,
          setName,
          code,
          setCode,
          price,
          setPrice,
          description,
          setDescription,
          avatars,
          setAvatars,
          isCancel,
          setIsCancel,
          isLoading,
          setIsLoading,
          isSubmit,
          setIsSubmit,
          isUpdate,
          setIsUpdate,
          isUploadCompleted,
          setIsUploadCompleted,
          isUpdatedCompleted,
          setIsUpdatedCompleted,
          isDelete,
          setIsDelete,
          isDeleteCompleted,
          setIsDeleteCompleted,
          keyword,
          setKeyword,
          cart,
          setCart,
          totalAmount,
          setTotalAmount,
          totalQuantity,
          setTotalQuantity,
          page,
          setPage,
          totalPage,
          setTotalPage,
          isPaymentSuccess,
          setIsPaymentSuccess,
        }}
      >
        <ChakraProvider>
          <Routes>
            {isAuthenticated ? (
              <>
                <Route path="/" element={<Homepage />} />
                <Route path="/product" element={<ProductListPage />} />
                <Route
                  path="/product/upload/"
                  element={<UploadProductPage />}
                />
                <Route
                  path="/product/upload/:id"
                  element={<UploadProductPage />}
                />
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
        </ChakraProvider>
      </AppContext.Provider>
    </>
  );
}

export default App;
