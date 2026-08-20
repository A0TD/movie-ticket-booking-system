import mongoose from "mongoose";
import User from "./userModel.ts";
import Showtime from "./showtimeModel.ts";
import { z } from "zod";

export const zodBookingSchema = z.object({
  body: z.object({
    booking: z.object({
      customer: z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID format")
        .refine(async (customer) => {
          const existingCustomer = await User.findById(customer);
          return Boolean(existingCustomer);
        }),
      showtime: z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, "Invalid showtime ID format")
        .refine(
          async (showtime) => {
            const existingShowtime = await Showtime.findById(showtime);
            return Boolean(existingShowtime);
          },
          { message: "That showtime doesn't exist." },
        ),
      selectedSeats: z.array(
        z.object({
          seatNumber: z.string().regex(/^[A-Z][0-9]+$/),
        }),
      ),
      totalPrice: z.number().positive(),
      bookingStatus: z.enum(["Pending", "Confirmed", "Cancelled"]),
    }),
  }),
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - customer
 *         - showtime
 *         - selectedSeats
 *         - totalPrice
 *         - bookingStatus
 *       properties:
 *         customer:
 *           type: string
 *           description: The ID of the customer!
 *         showtime:
 *           type: string
 *           description: The ID of the showtime!
 *         selectedSeats:
 *           type: array
 *           description: The seats selected by the customer!
 *           items:
 *             type: string
 *             description: Seat ID!
 *         totalPrice:
 *           type: number
 *           description: The total price of the tickets!
 *         bookingStatus:
 *           type: string
 *           description: Whether the booking is pending, confirmed, or cancelled!
 *       example:
 *         booking:
 *           customer: "58c62c2f9b1d8a2d88f31e21"
 *           showtime: "12c64c7f5b7c8b2d28f21b11"
 *           selectedSeats: ["b2","b3","b4"]
 *           totalPrice: 240
 *           bookingStatus: "Pending"
 */
const bookingSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  showtime: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  selectedSeats: {
    type: [String],
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  bookingStatus: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled"],
    default: "Pending",
    required: true,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
