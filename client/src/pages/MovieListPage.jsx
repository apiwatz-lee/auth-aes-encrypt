import { movies } from "../data/data";
import { useAuth } from "../context/Authentication";
import { jwtDecode } from "jwt-decode";
const MovieListPage = () => {
  const { logout } = useAuth();

  const token = localStorage.getItem("token");
  const decodeToken = jwtDecode(token);
  const firstname = decodeToken?.firstname;

  return (
    <>
      <div className=" bg-black w-full font-poppins p-11">
        <section className="container mx-auto max-w-3xl flex flex-col">
          <h1 className="text-white text-center text-4xl sm:text-6xl mt-9">
            <span className="text-red-600">NETFLIX</span> MOVIES
          </h1>

          <p className="text-white text-center mt-5">
            recommend for <strong>{firstname}</strong>
          </p>
          <hr className="h-[1px] bg-white opacity-60 my-3" />

          {movies.map((movie, index) => (
            <div key={index}>
              <img className="mt-6" src={movie?.url} />
              <h2 className="text-white opacity-60 text-sm mt-2">
                {movie?.by}
              </h2>
              <p className="text-red-600 font-bold text-lg">{movie?.year}</p>
              <h1 className="text-white text-3xl sm:text-5xl font-black">
                <i>{movie?.title}</i>
              </h1>

              <p className="text-white my-4">
                <strong className="font-black">LOGLINE: </strong>
                {`  `}
                {movie?.description}
              </p>

              <p className="text-white font-normal text-lg my-5">
                <strong>CAST:</strong>
                {movie?.cast}
              </p>

              <p className="text-white text-lg font-normal my-5">
                <strong>DIRECTOR:</strong>
                {movie?.director}
              </p>
            </div>
          ))}

          <div className="flex justify-center items-center mt-5 gap-5 flex-wrap">
            <button
              onClick={() => window.scrollTo(0, 0)}
              className=" text-white font-extrabold cursor-pointer  bg-red-500 w-48 w-max p-4 rounded-full hover:opacity-60 duration-500"
            >
              Back To Top
            </button>

            <button
              onClick={() => logout()}
              className=" text-white font-extrabold cursor-pointer  bg-slate-400 w-max p-4 rounded-full hover:opacity-60 duration-500"
            >
              Sign Out Of Netflix
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default MovieListPage;
