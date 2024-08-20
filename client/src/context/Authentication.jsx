import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useLoading } from "./LoadingProvider";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { setIsLoading } = useLoading();

  const server = import.meta.env.VITE_API;

  const register = async (data) => {
    try {
      setIsLoading(true);
      const {
        data: { message },
      } = await axios.post(`${server}/api/auth/register`, data);

      if (message === "user has been created successfully") {
        toast({
          title: "Register successfully.",
          description: `Your account has been created successfully!`,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        navigate("/signin");
      }
    } catch (error) {
      toast({
        title: "Signup failed.",
        description: `Your email or phone number is already taken`,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data) => {
    try {
      setIsLoading(true);
      const result = await axios.post(`${server}/api/auth/login`, data);

      if (!result) {
        toast({
          title: "Login failed.",
          description: `Invalid user ID or password`,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        return;
      }

      const token = result?.data?.token;
      if (rememberMe) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }

      const decodeToken = jwtDecode(token);

      navigate("/movies", { replace: true });
      toast({
        title: "Login successfully",
        description: `Hello ${decodeToken?.firstname}, Have a good day!`,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "Login failed.",
        description: `Invalid user ID or password`,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isAuthenticated = Boolean(
    localStorage.getItem("token") || sessionStorage.getItem("token")
  );

  const logout = () => {
    setIsLoading(true);
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/signin");
    toast({
      title: "Logout successfully.",
      description: `See you around!`,
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        isAuthenticated,
        logout,
        rememberMe,
        setRememberMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
