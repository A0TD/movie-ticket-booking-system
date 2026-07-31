import mongoose from "mongoose";
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
    enum: ["Customer", "Cinema Admin"],
    default: "Customer",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
