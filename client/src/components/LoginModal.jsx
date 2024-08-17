import { Checkbox, Stack } from "@chakra-ui/react";
import { useAuth } from "../context/Authentication";
import { useNavigate } from "react-router-dom";
import useValidatation from "../hook/useValidatation";

const LoginModal = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const { errorMessage, setUsername, setPassword, username, password } =
    useValidatation();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (errorMessage?.username || errorMessage?.password) return;

    const data = {
      username,
      password,
    };

    login(data);
  };

  return (
    <div className="modal-login p-14 w-full h-screen flex flex-col items-center justify-center relative">
      <h1 className="text-3xl flex justify-start w-full max-w-[500px] text-white">
        Sign In
      </h1>

      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 mt-6 w-full max-w-[500px]"
      >
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

        <div>
          <input
            type="password"
            id="password"
            name="password"
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

        <div className="mt-5">
          <button
            type="submit"
            className="w-full bg-[#e13b30] hover:bg-[#b8320f] text-white font-bold py-2 px-4 rounded"
          >
            Sign In
          </button>
        </div>

        <div className=" flex justify-between">
          <Stack spacing={5} direction="row">
            <Checkbox colorScheme="gray" defaultChecked>
              Remember me
            </Checkbox>
          </Stack>

          <div>
            <a
              href="#"
              className="text-sm text-gray-300 hover:underline hover:underline-offset-4"
            >
              Need help?
            </a>
          </div>
        </div>

        <div className="text-gray-300 text-sm">
          New to Netflix?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-white text-base cursor-pointer hover:underline hover:underline-offset-4"
          >
            Sign up now
          </span>
        </div>

        <div className="text-gray-300 text-sm">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
          <span className="text-blue-500 hover:underline cursor-pointer hover:underline-offset-4">
            Learn more.
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginModal;