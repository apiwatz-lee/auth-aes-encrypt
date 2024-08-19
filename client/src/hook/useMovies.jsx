import { useEffect, useState } from "react";
import axios from "axios";
import { useApp } from "../context/AppContext";

const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const server = import.meta.env.VITE_API;
  const { setIsLoading } = useApp();

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${server}/api/movies`);
      setMovies(res?.data?.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return { movies };
};

export default useMovies;
