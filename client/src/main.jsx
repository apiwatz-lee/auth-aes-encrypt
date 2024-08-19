import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/Authentication.jsx";
import jwtInterceptor from "./utils/jwtInterceptors.js";
import { BrowserRouter } from "react-router-dom";
import { LoadingProvider } from "./context/LoadingProvider.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import Loading from "./components/Loading.jsx";

jwtInterceptor();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <AuthProvider>
          <ChakraProvider>
            <Loading />
            <App />
          </ChakraProvider>
        </AuthProvider>
      </LoadingProvider>
    </BrowserRouter>
  </React.StrictMode>
);
