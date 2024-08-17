import { createContext, useContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
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

  return (
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
        isDeleteCompleted,
        setIsDeleteCompleted,
        isDelete,
        setIsDelete,
        isPaymentSuccess,
        setIsPaymentSuccess,
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useApp = () => useContext(AppContext);

export { AppProvider, useApp };
