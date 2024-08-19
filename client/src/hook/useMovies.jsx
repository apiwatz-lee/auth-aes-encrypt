import { useEffect, useState } from "react";
import axios from "axios";
import { useLoading } from "../context/LoadingProvider";

const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const server = import.meta.env.VITE_API;
  const { setIsLoading } = useLoading();

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${server}/api/movies`);
      setMovies(res?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return { movies };
};

export default useMovies;
