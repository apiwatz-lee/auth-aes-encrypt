import { Router } from "express";
import { getMovies } from "../controllers/movie.controller.js";
import { protect } from "../middlewares/protect.validation.js";
const moviesRouter = Router();

moviesRouter.get("/movies", protect, getMovies);

export default moviesRouter;
