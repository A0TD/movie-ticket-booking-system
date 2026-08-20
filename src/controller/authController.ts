import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userModel.ts";

const register = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password } = req.body;

    const foundUser = await User.findOne({ email });

    if (foundUser)
      return res
        .status(400)
        .send("This email already exists! Try a different one.");

    const hashedPassword = await bcrypt.hash(password, 10);

    User.create({
      fullName,
      email,
      password: hashedPassword,
    });
    return res.status(201).send("Account Created!")
  } catch (error) {
    console.error(`Error caught: ${error}`);
    res.status(500).send(`Error caught: ${error}`);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email });

    if (!foundUser) return res.status(400).send("Incorrect email or password!");

    const correctPassword = await bcrypt.compare(password, foundUser.password);

    if (!correctPassword)
      return res.status(400).send("Incorrect email or password!");

    const token = jwt.sign(
      { id: foundUser._id.toString(), role: foundUser.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "60m" },
    );

    res.cookie("token", token, { httpOnly: true });
    return res.status(200).send("Successfully signed in!");
  } catch (error) {
    console.error(`Error caught: ${error}`);
    res.status(500).send(`Error caught: ${error}`);
  }
};

const logout = (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    res.status(200).send("Signed out successfully!");
  } catch (error) {
    console.error(`Error caught: ${error}`);
    res.status(500).send(`Error caught: ${error}`);
  }
};

export { register, login, logout };
