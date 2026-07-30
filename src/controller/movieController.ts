import type { Request, Response } from "express";
import Movie from "../models/movieModel.ts";

const getAllMovies = async (req: Request, res: Response) => {
  const allMovies = await Movie.find();

  return res.status(200).json(allMovies);
};

const addMovie = async (req: Request, res: Response) => {
  const { title, genre, duration } = req.body.movie;

  Movie.create({
    title,
    genre,
    duration,
  });
};

const updateMovie = async (req: Request, res: Response) => {
  const { title, genre, duration } = req.body.movie;
};

export { getAllMovies, addMovie, updateMovie };
