import mongoose from "mongoose";

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
 *       example:
 *         movie: "60c72b2f9b1d8b2d88f34e21"
 *         hallNumber: 5
 *         date: "2026-06-06"
 *         startTime: "14:30"
 *         endTime: "16:45"
 *         ticketPrice: 150
 *         totalCapacity: 90
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
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
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
});

const Showtime = mongoose.model("Showtime", showtimeSchema);

export default Showtime;
