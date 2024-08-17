import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import LoginForm from "../components/LoginForm";
import LoginModal from "../components/LoginModal";
import useValidatation from "../hook/useValidatation";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full h-screen flex justify-center items-center">
      {/* <section className="bg-shopping bg-cover w-screen h-screen font-poppins">
        <div
          className="hidden lg:block absolute top-5 left-5 text-white cursor-pointer"
          onClick={() => navigate("/product")}
        >
          <FaArrowLeftLong className="text-3xl hover:text-gray-300 duration-300" />
        </div>

        <LoginForm />
      </section> */}

      <LoginModal />
    </section>
  );
};

export default LoginPage;
