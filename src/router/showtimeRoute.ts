import { Router } from "express";
import * as methods from "../controller/showtimeController.ts";
import { authenticate, authorize } from "../middleware/authGuard.ts";
import validate from "../middleware/validation.ts";
import { zodShowtimeSchema } from "../models/showtimeModel.ts";

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Showtimes
 *   description: The showtimes route!
 */

/**
 * @swagger
 * /showtime:
 *   get:
 *     tags: [Showtimes]
 *     summary: Returns a list of all showtimes!
 *     responses:
 *       200:
 *         description: 
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Showtime'
 *       401:
 *         description: Unauthenticated!
 *       500:
 *         description: Some server error!
 */
router.get("/", authenticate, methods.getAllShowtimes);
/**
 * @swagger
 * /showtime:
 *   post:
 *     tags: [Showtimes]
 *     summary: Adds a new showtime!
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Showtime'
 *     responses:
 *       201:
 *         description: Added new showtime!
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Showtime'
 *       403:
 *         description: Unauthorized access!
 *       500:
 *         description: Some server error!
 */

router.post("/", validate(zodShowtimeSchema), authorize, methods.addShowtime);
/**
 * @swagger
 * /showtime/{id}:
 *   put:
 *     tags: [Showtimes]
 *     summary: Updates a showtime by ID!
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the showtime to be updated!
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *                 $ref: '#/components/schemas/Showtime'
 *     responses:
 *       200:
 *         description: Updated the showtime!
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Showtime'
 *       403:
 *         description: Unauthorized access!
 *       404:
 *         description: Showtime not found! Try a different id!
 *       500:
 *         description: Some server error!
 */

router.put(
  "/:id",
  validate(zodShowtimeSchema),
  authorize,
  methods.updateShowtime,
);
/**
 * @swagger
 * /showtime/{id}:
 *   delete:
 *     tags: [Showtimes]
 *     summary: Deletes a showtime by id!
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the showtime to be deleted!
 *     responses:
 *       200:
 *         description: Deleted movie!
 *       403:
 *         description: Unauthorized access!
 *       404:
 *         description: Showtime not found! Try a different id!
 *       500:
 *         description: Some server error!
 */

router.delete("/:id", authorize, methods.deleteShowtime);

export default router;
