import { Router } from "express";
import * as methods from "../controller/movieController.ts";
import { authenticate, authorize } from "../middleware/authGuard.ts";
import validate from "../middleware/validation.ts";
import { zodMovieSchema } from "../models/movieModel.ts";

const router = Router();

// Tags
/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: The movies routes!
 */
// Routes
/**
 * @swagger
 * /movies:
 *   get:
 *     tags: [Movies]
 *     summary: Returns a list of all the movies
 *     responses:
 *       200:
 *         description: List of all the movies!
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *       401:
 *         description: Authentication failure!
 *       500:
 *         description: Some server error!
 */
router.get("/", authenticate, methods.getAllMovies);
/**
 * @swagger
 * /movies:
 *   post:
 *     tags: [Movies]
 *     summary: Adds a new movie to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Movie'
 *     responses:
 *       201:
 *         description: Successfully added movie!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 movie:
 *                   $ref: '#components/schemas/Movie'
 *       400:
 *         description: Bad request/Missing data!
 *       403:
 *         description: Unauthorized access!
 *       500:
 *         description: Some server error!
 */
router.post("/", authorize, validate(zodMovieSchema), methods.addMovie);
/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     tags: [Movies]
 *     summary: Updates a single movie by ID!
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the movie to be updated!
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: Successfully updated the movie!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       403:
 *         description: Unauthorized access!
 *       404:
 *         description: Movie not found! Try a different ID!
 *       500:
 *         description: Some server error!
 */
router.put("/:id", authorize, validate(zodMovieSchema), methods.updateMovie);
/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     tags: [Movies]
 *     summary: Deletes a single movie by ID!
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the movie to be deleted!
 *     responses:
 *       200:
 *         description: Successfully deleted!
 *       403:
 *         description: Unauthorized access!
 *       404:
 *         description: Movie not found! Try a different ID!
 *       500:
 *         description: Some server error!
 */
router.delete("/:id", authorize, methods.deleteMovie);

export default router;
