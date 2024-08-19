import { db } from "../utils/db.js";

export const getMovies = async (req, res) => {
  try {
    const movies = await db.collection("movies").find().toArray();
    return res.status(200).json({ data: movies });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
