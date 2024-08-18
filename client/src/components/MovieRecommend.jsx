const MovieRecommend = ({
  title,
  image,
  author,
  year,
  description,
  cast,
  director,
}) => {
  return (
    <div>
      <img className="mt-6" src={image} />
      <h2 className="text-white opacity-60 text-sm mt-2">{author}</h2>
      <p className="text-red-600 font-bold text-lg">{year}</p>
      <h1 className="text-white text-3xl sm:text-5xl font-black">
        <i>{title}</i>
      </h1>

      <p className="text-white my-4">
        <strong className="font-black">LOGLINE: </strong>
        {`  `}
        {description}
      </p>

      <p className="text-white font-normal text-lg my-5">
        <strong>CAST:</strong>
        {cast}
      </p>

      <p className="text-white text-lg font-normal my-5">
        <strong>DIRECTOR:</strong>
        {director}
      </p>
    </div>
  );
};

export default MovieRecommend;
