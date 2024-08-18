import React from "react";
import { useAuth } from "../context/Authentication";
import { useNavigate } from "react-router-dom";
import useValidatation from "../hook/useValidatation";

const RegisterPage = () => {
  const { register } = useAuth();

  const {
    errorMessage,
    setAccountName,
    setUsername,
    setPassword,
    setConfirmPassword,
    accountName,
    username,
    password,
    confirmPassword,
  } = useValidatation();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      errorMessage.accountName ||
      errorMessage?.username ||
      errorMessage?.password ||
      errorMessage?.confirmPassword
    )
      return;

    const data = {
      accountName,
      username,
      password,
      confirmPassword,
    };
    register(data);
  };

  return (
    <>
      <div className="modal-login p-14 w-full h-screen flex flex-col items-center justify-center relative">
        <h1 className="text-3xl flex justify-start w-full max-w-[500px] text-white">
          Sign Up
        </h1>

        <form
          onSubmit={handleRegister}
          className="flex flex-col gap-4 mt-6 w-full max-w-[500px]"
        >
          {/* account name */}
          <div className="relative">
            <input
              type="text"
              className={`text-white mt-1 p-4 border border-gray-300 block w-full shadow-sm sm:text-sm rounded-md h-12 bg-slate-600 border-none outline-none ${
                errorMessage?.accountName && "shadow-bottom-only"
              }`}
              placeholder="Your account name"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
            />

            <p className="text-sm mt-2 pl-1 text-[#fa9a00]">
              {errorMessage?.accountName}
            </p>
          </div>

          {/* username */}
          <div className="relative">
            <input
              type="text"
              className={`text-white mt-1 p-4 border border-gray-300 block w-full shadow-sm sm:text-sm rounded-md h-12 bg-slate-600 border-none outline-none ${
                errorMessage?.username && "shadow-bottom-only"
              }`}
              placeholder="Email or phone number"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <p className="text-sm mt-2 pl-1 text-[#fa9a00]">
              {errorMessage?.username}
            </p>
          </div>

          {/* password */}
          <div>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              className={`text-white mt-1 p-4 border border-gray-300 block w-full shadow-sm sm:text-sm rounded-md h-12 bg-slate-600 border-none outline-none ${
                errorMessage?.password && "shadow-bottom-only"
              }`}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-sm mt-2 pl-1 text-[#fa9a00]">
              {errorMessage?.password}
            </p>
          </div>

          {/* confirm password */}
          <div>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              className={`text-white mt-1 p-4 border border-gray-300 block w-full shadow-sm sm:text-sm rounded-md h-12 bg-slate-600 border-none outline-none ${
                errorMessage?.confirmPassword && "shadow-bottom-only"
              }`}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <p className="text-sm mt-2 pl-1 text-[#fa9a00]">
              {errorMessage?.confirmPassword}
            </p>
          </div>

          {/* submit button */}
          <div className="mt-5">
            <button
              type="submit"
              className="w-full bg-[#e13b30] hover:bg-[#b8320f] text-white font-bold py-2 px-4 rounded"
            >
              Sign Up
            </button>
          </div>

          {/* recaptcha */}
          <div
            onClick={() => navigate("/signin")}
            className="text-gray-300 hover:underline cursor-pointer hover:underline-offset-4 hover:text-blue-500"
          >
            Back to sign in
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
