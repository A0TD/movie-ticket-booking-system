import type { Request, Response } from "express";
import Movie from "../models/movieModel.ts";

const getAllMovies = async (req: Request, res: Response) => {
  try {
    const allMovies = await Movie.find();

    return res.status(200).json(allMovies);
  } catch (error) {
    console.error(`Error caught: ${error}`);
    res.status(500).send(`Error caught: ${error}`);
  }
};

const addMovie = async (req: Request, res: Response) => {
  try {
    const { title, genre, duration, description, posterURL, rating, status } =
      req.body.movie;

    const addedMovie = await Movie.create({
      title,
      genre,
      duration,
      description,
      posterURL,
      rating,
      status,
    });

    return res.status(201).json(addedMovie);
  } catch (error) {
    console.error(`Error caught: ${error}`);
    res.status(500).send(`Error caught: ${error}`);
  }
};

const updateMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, genre, duration, description, posterURL, rating, status } =
      req.body.movie;
    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      { title, genre, duration, description, posterURL, rating, status },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updateMovie)
      return res.status(404).send("Movie not found! Try a different id");

    return res.status(200).json({
      message: "Updated movie!",
      data: updatedMovie,
    });
  } catch (error) {
    console.error(`Error caught: ${error}`);
    res.status(500).send(`Error caught: ${error}`);
  }
};

const deleteMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedMovie = await Movie.findByIdAndDelete(id);

    if (!deletedMovie)
      return res.status(404).send("Movie not found! Try a different id");

    return res.status(200).json({
      message: "Deleted movie!",
    });
  } catch (error) {
    console.error(`Error caught: ${error}`);
    res.status(500).send(`Error caught: ${error}`);
  }
};

export { getAllMovies, addMovie, updateMovie, deleteMovie };
