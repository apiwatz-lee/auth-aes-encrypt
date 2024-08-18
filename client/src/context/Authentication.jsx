import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [account, setAccount] = useState({
    loading: null,
    error: null,
    user: null,
  });

  const navigate = useNavigate();
  const toast = useToast();

  const server = import.meta.env.VITE_API;

  const register = async (data) => {
    try {
      const {
        data: { message },
      } = await axios.post(`${server}/auth/register`, data);

      if (message === "user has been created successfully") {
        toast({
          title: "Register successfully.",
          description: `We have created your account successfully!`,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        navigate("/signin");
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast({
        title: "signup failed.",
        description: `username is already taken.`,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const login = async (data) => {
    try {
      const result = await axios.post(`${server}/auth/login`, data);
      const token = result?.data?.token;
      localStorage.setItem("token", token);
      const userDataFromToken = jwtDecode(token);
      setAccount({ ...account, user: userDataFromToken });
      navigate("/movies");
      toast({
        title: "Login successfully",
        description: `Hello ${userDataFromToken.firstname}, Have a good day!`,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.log(`Cannot login from client due to ${error}`);
      toast({
        title: "Login failed.",
        description: `Invalid user ID or password`,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const isAuthenticated = Boolean(localStorage.getItem("token"));

  const logout = () => {
    const getToken = localStorage.getItem("token");
    const decodeToken = jwtDecode(getToken);
    const name = decodeToken.firstname;
    localStorage.removeItem("token");
    setAccount({ ...account, user: null });
    navigate("/signin");
    toast({
      title: "Logout successfully.",
      description: `Hey ${name}, See you around!`,
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <AuthContext.Provider
      value={{ account, register, login, isAuthenticated, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
