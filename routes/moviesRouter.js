import express from "express";
import {
  addMovie,
  getMovies,
  editMovie,
} from "../controllers/moviesController.js";
const router = express.Router();

router.post("/addmovie", addMovie);
router.get("/getmovies", getMovies);
router.put("/editmovie/:id", editMovie);

export default router;
