import mongoose from "mongoose";
import { z } from "zod";

export const zodShowtimeSchema = z.object({
  body: z.object({
    showtime: z.object({
      movie: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Movie ID format"),
      hallNumber: z
        .number()
        .int()
        .min(1, "Hall Number must be between 1 and 10")
        .max(10, "Hall Number must be between 1 and 10"),
      date: z.coerce.date(),
      startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
      endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
      ticketPrice: z.number().positive(),
      totalCapacity: z.number().int().positive("Capacity must be positive!"),
      seats: z.array(
        z.object({
          seatNumber: z.string().regex(/^[A-Z][0-9]+$/),
          isBooked: z.boolean().default(false),
        }),
      ),
    }),
  }),
});
/**
 * @swagger
 * components:
 *   schemas:
 *     Seat:
 *       type: object
 *       required:
 *         - seatNumber
 *       properties:
 *         seatNumber:
 *           type: string
 *           description: The id of the seat!
 *         isBooked:
 *           type: boolean
 *           description: Whether the seat is booked or not!
 *       example:
 *         seatNumber: "A2"
 *         isBooked: false
 */
const seatSchema = new mongoose.Schema({
  seatNumber: {
    type: String,
    required: true,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Showtime:
 *       type: object
 *       required:
 *         - movie
 *         - hallNumber
 *         - date
 *         - startTime
 *         - endTime
 *         - ticketPrice
 *         - totalCapacity
 *         - seats
 *       properties:
 *         movie:
 *           type: string
 *           description: The ID of the movie!
 *         hallNumber:
 *           type: number
 *           description: The number of the hall the movie is being shown at!
 *         date:
 *           type: string
 *           description: What day the movie will be shown!
 *         startTime:
 *           type: string
 *           description: What time the movie starts!
 *         endTime:
 *           type: string
 *           description: What time the movie ends!
 *         ticketPrice:
 *           type: number
 *           description: The price of the ticket!
 *         totalCapacity:
 *           type: number
 *           description: The maximum capacity of the hall!
 *         seats:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Seat'
 *       example:
 *         showtime:
 *           movie: "60c72b2f9b1d8b2d88f34e21"
 *           hallNumber: 5
 *           date: "2026-06-06"
 *           startTime: "14:30"
 *           endTime: "16:45"
 *           ticketPrice: 150
 *           totalCapacity: 90
 *           seats:
 *             - seatNumber: "A1"
 *               isBooked: false
 *             - seatNumber: "A2"
 *               isBooked: false
 *             - seatNumber: "A3"
 *               isBooked: true
 */
const showtimeSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  hallNumber: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  totalCapacity: {
    type: Number,
    required: true,
  },
  seats: {
    type: [seatSchema],
    required: true,
  },
});

const Showtime = mongoose.model("Showtime", showtimeSchema);

export default Showtime;
