import { useAuth } from "../context/Authentication";
import useMovies from "../hook/useMovies";
import useToken from "../hook/useToken";
import MovieRecommend from "./MovieRecommend";
import ScrollToTop from "./ScrollToTop";

const Movies = () => {
  const { firstname } = useToken();
  const { movies } = useMovies();
  const { logout } = useAuth();
  return (
    <>
      <main className=" bg-black w-full font-poppins p-11">
        <section className="container mx-auto max-w-3xl flex flex-col">
          <h1 className="text-white text-center text-4xl sm:text-6xl mt-9">
            <span className="text-red-600">NETFLIX</span> MOVIES
          </h1>

          <p className="text-white text-center mt-5">
            recommend for <strong>{firstname}</strong>
          </p>
          <hr className="h-[1px] bg-white opacity-60 my-3" />

          {movies?.map((movie) => (
            <MovieRecommend
              key={movie?._id}
              title={movie?.title}
              image={movie?.poster}
              author={movie?.by}
              year={movie?.year}
              description={movie?.description}
              cast={movie?.cast}
              director={movie?.director}
              link={movie?.link}
            />
          ))}

          <div className="flex justify-center items-center mt-5 gap-5 flex-wrap">
            <button
              onClick={() => logout()}
              className=" text-white font-extrabold cursor-pointer  bg-slate-400 w-max p-4 rounded-full hover:opacity-60 duration-500"
            >
              Sign Out Of Netflix
            </button>
          </div>
        </section>
      </main>
      <ScrollToTop />
    </>
  );
};

export default Movies;
