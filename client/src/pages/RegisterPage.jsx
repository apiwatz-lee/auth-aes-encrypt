import React from "react";
import { useState } from "react";
import { useAuth } from "../context/Authentication";
import { useNavigate } from "react-router-dom";
import RegisterInput from "../components/RegisterInput";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [errorMessage, setErrorMessage] = useState({});
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleValidate = (e) => {
    e.preventDefault();
    const lowerCase = /[a-z]/g;
    const upperCase = /[A-Z]/g;
    const numbers = /[0-9]/g;
    if (username === "") {
      setErrorMessage({ username: "Username is required" });
    } else if (password === "") {
      setErrorMessage({ password: "Password is required" });
    } else if (!password.match(lowerCase)) {
      setErrorMessage({
        password: "Password should contains lowercase letters!",
      });
    } else if (!password.match(upperCase)) {
      setErrorMessage({
        password: "Password should contains uppercase letters!",
      });
    } else if (!password.match(numbers)) {
      setErrorMessage({ password: "Password should contains numbers also!" });
    } else if (password.length < 9) {
      setErrorMessage({ password: "Password length should be more than 9" });
    } else if (firstname === "") {
      setErrorMessage({ firstname: "Firstname is required" });
    } else if (lastname === "") {
      setErrorMessage({ lastname: "Lastname is required" });
    } else {
      handleRegister();
    }
  };

  const handleRegister = async () => {
    const data = {
      username,
      password,
      firstname,
      lastname,
    };
    register(data);
  };

  return (
    <>
      <main className="bg-shopping bg-cover w-screen h-screen font-poppins">
        <section className="w-full h-full flex flex-col justify-center items-center">
          <form
            onSubmit={handleValidate}
            className="p-10 w-[280px] sm:w-[400px] h-[650px] rounded-3xl flex flex-col gap-1 justify-center items-center backdrop-opacity-5 bg-gray-900 bg-opacity-90 shadow-2xl"
          >
            <h1 className="text-gray-100 text-center text-2xl sm:text-3xl font-bold mb-5">
              Account Register
            </h1>

            <RegisterInput
              name="Username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              errorMessage={errorMessage.username}
            />
            <RegisterInput
              name="Password"
              type="password"
              placeholder="e.g. ToonLogin!3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              errorMessage={errorMessage.password}
            />
            <RegisterInput
              name="Firstname"
              type="text"
              placeholder="Enter your firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              errorMessage={errorMessage.firstname}
            />
            <RegisterInput
              name="Lastname"
              type="text"
              placeholder="Enter your lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              errorMessage={errorMessage.lastname}
            />

            <div className="flex flex-col sm:flex-row justify-center items-center gap-1 w-full mt-3">
              <p className="text-white text-sm">Already have an account ? </p>
              <span
                className="text-blue-600 underline cursor-pointer text-sm"
                onClick={() => navigate("/login")}
              >
                Log in
              </span>
            </div>

            <button
              type="submit"
              className="text-white border p-2 w-44 rounded-full font-bold text-xl mt-5 hover:bg-gray-600 hover:border-gray-600 duration-300"
            >
              Sign Up
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

export default RegisterPage;
