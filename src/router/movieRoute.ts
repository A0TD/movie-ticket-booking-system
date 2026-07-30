import { Router } from "express";
import * as methods from "../controller/movieController.ts";
import { authenticate, authorize } from "../middleware/authGuard.ts";

const router = Router();

// Tags
/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: The authentication routes!
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
 *       200:
 *         description: Successfully added movie!
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/Movie'
 *       400:
 *         description: Bad request/Missing data!
 *       403:
 *         description: Unauthorized access!
 *       500:
 *         description: Some server error!
 */
router.post("/", authorize, methods.addMovie);

export default router;
