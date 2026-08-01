import {Router} from 'express'
import * as methods from '../controller/bookingController.ts'
import { authenticate,authorize } from '../middleware/authGuard.ts'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Booking
 *   description: The booking routes!
 */

/**
 * @swagger
 * /booking:
 *   post:
 *     tags: [Booking]
 *     summary: Creates a new booking!
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       201:
 *         description: Successfully created booking!
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       403:
 *         description: Unauthorized access!
 *       500:
 *         description: Some server error!
 */
router.post("/",authenticate,methods.makeBooking)
/**
 * @swagger
 * /booking:
 *   delete:
 *     tags: [Booking]
 *     summary: Deletes a specific booking by ID!
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the booking!
 *     responses:
 *       200:
 *         description: Deleted booking!
 *       403:
 *         description: Unauthorized access!
 *       404:
 *         description: Booking not found! Try a different ID!
 *       500:
 *         description: Some server error!
 */
router.delete("/",authenticate,methods.cancelBooking)
/**
 * @swagger
 * /booking:
 *   get:
 *     tags: [Booking]
 *     summary: Returns a list of all the bookings!
 *     responses:
 *       200:
 *         description: Successfully returns a list of the bookings!
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       403:
 *         description: Unauthorized access!
 *       500:
 *         description: Some server error!
 */
router.get("/",authorize,methods.viewAllBookings)

export default router