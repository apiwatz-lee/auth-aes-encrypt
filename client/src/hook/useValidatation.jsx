import { useState, useEffect } from "react";

const useValidatation = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

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
    const passwordCondition = password.length >= 4 && password.length <= 60;

    if (password === "") {
      setErrorMessage((prev) => ({
        ...prev,
        password: "Password is required",
      }));
    }

    if (!passwordCondition) {
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

  const handleSigupValidation = (username, password, confirmPassword) => {
    handleValidateUsername(username);
    handleValidatePassword(password);
    handleValidateConfirmPassword(confirmPassword);
  };

  useEffect(() => {
    handleSigupValidation(username, password, confirmPassword);
  }, [username, password, confirmPassword]);

  return {
    handleValidateUsername,
    handleValidatePassword,
    handleValidateConfirmPassword,
    handleSigupValidation,
    setUsername,
    setPassword,
    setConfirmPassword,
    username,
    password,
    confirmPassword,
    errorMessage,
  };
};

export default useValidatation;
