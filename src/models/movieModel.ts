import mongoose from "mongoose";
import { z } from "zod";

export const zodMovieSchema = z.object({
  body: z.object({
    movie: z.object({
      title: z.string().min(2),
      genre: z.string().min(2).max(30),
      duration: z.number().int().min(30),
      description: z.string().min(10).optional(),
      posterURL: z.url().optional(),
      rating: z.number().min(0).max(5).optional(),
      status: z.enum(["Now Showing", "Coming Soon"]).optional(),
    }),
  }),
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       required:
 *         - title
 *         - genre
 *         - duration
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the movie!
 *         genre:
 *           type: string
 *           description: The genre of the movie!
 *         duration:
 *           type: number
 *           description: How long the movie is!
 *         description:
 *           type: string
 *           description: A short overview of the movie!
 *         posterURL:
 *           type: string
 *           description: A link to the poster image of the movie!
 *         rating:
 *           type: number
 *           description: The movie's rating!
 *         status:
 *           type: string
 *           description: Whether the movie is coming soon or currently being shown!
 *       example:
 *         movie:
 *           title: Spider-Man brand new day!
 *           genre: Marvel
 *           duration: 145
 *           description: A forgotten Peter Parker lives alone as a full-time Spider-Man until mounting pressure triggers a dangerous change and a powerful new enemy emerges.
 *           posterURL: https://www.imdb.com/title/tt22084616/mediaviewer/rm749131010/
 *           rating: 0
 *           status: Coming Soon
 */
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  genre: {
    type: String,
    required: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: "N/A",
  },
  posterURL: {
    type: String,
    default: "N/A",
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  status: {
    type: String,
    enum: ["Now Showing", "Coming Soon"],
    default: "Coming Soon",
  },
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
