import type { Request, Response } from "express";
import User from "../models/userModel.ts";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await User.find();

    return res.status(200).send(allUsers);
  } catch (error) {
    return res.status(500).send(`Error caught: ${error}`);
  }
};

const requestAdmin = async (req: Request, res: Response) => {
  try {
    const { admin_key } = req.body;
    if (admin_key !== (process.env.ADMIN_KEY as string))
      return res.status(400).send("Invalid admin key!");

    await User.updateOne({ _id: res.locals.user.id}, { role: "Admin" });

    return res.status(200).send("Successfully granted admin access!");
  } catch (error) {
    return res.status(500).send(`Error caught: ${error}`);
  }
};

export { getAllUsers, requestAdmin };
