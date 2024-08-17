import React, { useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ProductConfirmation from "../components/ProductConfirmation";
import Loading from "../components/Loading";
import { AppContext } from "../App";
import Form from "../components/Form";
import Navigator from "../components/Navigator";
import { useEffect } from "react";

const UploadProductPage = () => {
  const {
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
    setIsLoading,
    setIsSubmit,
    setIsUpdate,
    setIsUploadCompleted,
    setIsDelete,
    setIsUpdatedCompleted,
    setIsDeleteCompleted,
  } = useContext(AppContext);

  const server = import.meta.env.VITE_API;
  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(false);
    setIsLoading(true);
    setIsUploadCompleted(false);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("code", code);
    formData.append("price", price);
    formData.append("description", description);
    avatars.forEach((file) => formData.append("avatar", file));
    handleUpload(formData);
  };

  const handleUpload = async (formData) => {
    try {
      await axios.post(`${server}/product/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setIsLoading(false);
      navigate("/product");
      setIsUploadCompleted(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setIsUpdate(false);
      setIsLoading(true);
      setIsUpdatedCompleted(false);
      const data = {
        name: name,
        code: code,
        price: price,
        description: description,
        avatars: avatars,
      };
      await axios.put(`${server}/product/upload/${params.id}`, data);
      setIsLoading(false);
      navigate("/product");
      setIsUpdatedCompleted(true);
    } catch (error) {
      console.log(error);
    }
  };

  const getProductById = async () => {
    try {
      if (params.id) {
        const response = await axios.get(`${server}/product/${params.id}`);
        setAvatars([...response.data.data[0].avatars]);
        setName(response.data.data[0].name);
        setPrice(response.data.data[0].price);
        setCode(response.data.data[0].code);
        setDescription(response.data.data[0].description);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      setIsDelete(false);
      setIsLoading(true);
      await axios.delete(`${server}/product/${params.id}`);
      setIsDeleteCompleted(true);
      setIsLoading(false);
      navigate("/product");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductById();
  }, []);

  return (
    <>
      <Navigator />
      <main className="font-poppins w-screen flex flex-col items-center gap-5">
        <h1 className="text-3xl font-medium w-[90vw] pt-5 text-center sm:text-left">
          Upload Product
        </h1>
        <section className="flex flex-col justify-center items-center w-[75%]">
          <Form params={params} />
          <ProductConfirmation
            handleSubmit={handleSubmit}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
          <Loading />
        </section>
      </main>
    </>
  );
};

export default UploadProductPage;
