import { useState, useEffect } from "react";

const useValidatation = () => {
  const [accountName, setAccountName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    accountName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleValidateAccountName = (accountName) => {
    if (accountName === "") {
      setErrorMessage((prev) => ({
        ...prev,
        accountName: "Account name is required",
      }));
    } else if (accountName.length < 4) {
      setErrorMessage((prev) => ({
        ...prev,
        accountName: "Account name must be at least 4 characters",
      }));
    } else {
      setErrorMessage((prev) => ({
        ...prev,
        accountName: "",
      }));
    }
  };

  const handleValidateUsername = (username) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (username === "") {
      setErrorMessage((prev) => ({
        ...prev,
        username: "Username is required",
      }));
    }

    if (username.match(emailRegex)) {
      if (!emailRegex.test(username)) {
        setErrorMessage((prev) => ({
          ...prev,
          username: "Please enter a valid email",
        }));
      } else {
        setErrorMessage((prev) => ({ ...prev, username: "" }));
      }
    } else if (username.match(phoneRegex)) {
      if (!phoneRegex.test(username)) {
        setErrorMessage((prev) => ({
          ...prev,
          username: "Please enter a valid phone number",
        }));
      } else {
        setErrorMessage((prev) => ({ ...prev, username: "" }));
      }
    } else {
      setErrorMessage((prev) => ({
        ...prev,
        username: "Please enter a valid email or phone number",
      }));
    }
  };

  const handleValidatePassword = (password) => {
    const moreThanFourAndLessThanSixty =
      password.length >= 4 && password.length <= 60;
    const signin = window.location.href.includes("signin");
    const signup = window.location.href.includes("signup");
    const lowerCase = /[a-z]/g;
    const upperCase = /[A-Z]/g;
    const numbers = /[0-9]/g;

    if (signin) {
      if (!moreThanFourAndLessThanSixty) {
        setErrorMessage((prev) => ({
          ...prev,
          password: "Your password must contain between 4 and 60 characters",
        }));
      } else {
        setErrorMessage((prev) => ({
          ...prev,
          password: "",
        }));
      }
    }

    if (signup) {
      if (password === "") {
        setErrorMessage((prev) => ({
          ...prev,
          password: "Password is required",
        }));
      } else if (!moreThanFourAndLessThanSixty) {
        setErrorMessage((prev) => ({
          ...prev,
          password: "Your password must contain between 4 and 60 characters",
        }));
      } else if (!password.match(upperCase)) {
        setErrorMessage((prev) => ({
          ...prev,
          password: "Your password must contain at least one uppercase letter",
        }));
      } else if (!password.match(lowerCase)) {
        setErrorMessage((prev) => ({
          ...prev,
          password: "Your password must contain at least one lowercase letter",
        }));
      } else if (!password.match(numbers)) {
        setErrorMessage((prev) => ({
          ...prev,
          password: "Your password must contain at least one number",
        }));
      } else {
        setErrorMessage((prev) => ({
          ...prev,
          password: "",
        }));
      }
    }
  };

  const handleValidateConfirmPassword = (confirmPassword) => {
    if (confirmPassword === "") {
      setErrorMessage((prev) => ({
        ...prev,
        confirmPassword: "Confirm password is required",
      }));
    }

    if (confirmPassword.length > 0 && password !== confirmPassword) {
      setErrorMessage((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
    } else if (confirmPassword.length > 0 && password === confirmPassword) {
      setErrorMessage((prev) => ({
        ...prev,
        confirmPassword: "",
      }));
    }
  };

  const handleSigupValidation = (
    accountName,
    username,
    password,
    confirmPassword
  ) => {
    handleValidateAccountName(accountName);
    handleValidateUsername(username);
    handleValidatePassword(password);
    handleValidateConfirmPassword(confirmPassword);
  };

  useEffect(() => {
    handleSigupValidation(accountName, username, password, confirmPassword);
  }, [accountName, username, password, confirmPassword]);

  return {
    handleValidateAccountName,
    handleValidateUsername,
    handleValidatePassword,
    handleValidateConfirmPassword,
    handleSigupValidation,
    setUsername,
    setPassword,
    setConfirmPassword,
    accountName,
    setAccountName,
    username,
    password,
    confirmPassword,
    errorMessage,
  };
};

export default useValidatation;
