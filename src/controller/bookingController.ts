import type { Request, Response } from "express";
import Booking from "../models/bookingModel";

const makeBooking = async (req: Request, res: Response) => {
  try {
    const { customer, showtime, selectedSeats, totalPrice, bookingStatus } =
      req.body.Booking;

    const newBooking = await Booking.create({
      customer,
      showtime,
      selectedSeats,
      totalPrice,
      bookingStatus,
    });

    return res.status(201).json({
      message: "Successfully booked!",
      data: newBooking,
    });
  } catch (error) {
    console.error(`Error caught: ${error}`);
    res.status(500).send(`Error caught: ${error}`);
  }
};

const cancelBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking)
      return res.status(404).send("Booking not found! Try a different id");

    return res.status(200).json({
      message: "Deleted booking!",
    });
  } catch (error) {
    console.error(`Error caught: ${error}`);
    res.status(500).send(`Error caught: ${error}`);
  }
};

const viewAllBookings = async (req: Request, res: Response) => {
  try {
    const allBookings = await Booking.find();

    return res.status(200).json({
      data: allBookings,
    });
  } catch (error) {
    console.error(`Error caught: ${error}`);
    res.status(500).send(`Error caught: ${error}`);
  }
};

export { makeBooking, cancelBooking, viewAllBookings };
