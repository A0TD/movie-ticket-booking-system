import type { Request, Response } from "express";
import Showtime from "../models/showtimeModel.ts";

const getAllShowtimes = async (req: Request, res: Response) => {
  try {
    const allShowtimes = await Showtime.find();

    return res.status(200).json(allShowtimes);
  } catch (error) {
    console.error(`Error caught: ${error}`);
    res.status(500).send(`Error caught: ${error}`);
  }
};

const addShowtime = async (req: Request, res: Response) => {
  try {
    const {
      movie,
      date,
      hallNumber,
      startTime,
      endTime,
      ticketPrice,
      totalCapacity,
      seats,
    } = req.body.showtime;

    const foundDuplicate = await Showtime.findOne({
      movie,
      date,
      hallNumber,
      startTime,
    });

    if (foundDuplicate)
      return res.status(400).send("This showtime already exists!");

    const addedShowtime = await Showtime.create({
      movie,
      date,
      hallNumber,
      startTime,
      endTime,
      ticketPrice,
      totalCapacity,
      seats,
    });

    return res.status(201).json({ showtime: addedShowtime });
  } catch (error) {
    console.error(`Error caught: ${error}`);
    res.status(500).send(`Error caught: ${error}`);
  }
};

const updateShowtime = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      movie,
      date,
      hallNumber,
      startTime,
      endTime,
      ticketPrice,
      totalCapacity,
      seats,
    } = req.body.showtime;

    const foundDuplicate = await Showtime.findOne({
      movie,
      date,
      hallNumber,
      startTime,
    });

    if (foundDuplicate)
      return res.status(400).send("This showtime already exists!");

    const updatedShowtime = await Showtime.findByIdAndUpdate(
      id,
      {
        movie,
        date,
        hallNumber,
        startTime,
        endTime,
        ticketPrice,
        totalCapacity,
        seats,
      },
      {
        runValidators: true,
        returnDocument: "after",
      },
    );

    if (!updatedShowtime)
      return res.status(404).send("Showtime not found! Try a different id");

    return res.status(200).json({
      message: "Updated Showtime!",
      showtime: updatedShowtime,
    });
  } catch (error) {
    console.error(`Error caught: ${error}`);
    res.status(500).send(`Error caught: ${error}`);
  }
};

const deleteShowtime = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedShowtime = await Showtime.findByIdAndDelete(id);

    if (!deletedShowtime)
      return res.status(404).send("Showtime not found! Try a different id");

    return res.status(200).json({
      message: "Deleted Showtime!",
    });
  } catch (error) {
    console.error(`Error caught: ${error}`);
    res.status(500).send(`Error caught: ${error}`);
  }
};

export { getAllShowtimes, addShowtime, updateShowtime, deleteShowtime };
