import mongoose from "mongoose";
import { z } from "zod";

export const zodRegisterSchema = z.object({
  body: z.object({
    fullName: z.string("Username must be at least 3 characters").min(3),
    email: z.email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  }),
});

export const zodLoginSchema = z.object({
  body: z.object({
    email: z.email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  }),
});

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - password
 *       properties:
 *         fullName:
 *           type: string
 *           description: The full name of the user!
 *         email:
 *           type: string
 *           description: The email address of the user!
 *         password:
 *           type: string
 *           description: The password the user uses to gain access to the website!
 *         role:
 *           type: string
 *           description: What role the user has, restricting access to specific parts of the website!
 *       example:
 *         fullName: John Michael Brown
 *         email: johnbrown12@gmail.com
 *         password: Johns#Birthday123
 *         role: Customer
 */
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Customer", "Admin"],
    default: "Customer",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
