import { Router } from "express";
import * as methods from "../controller/authController.ts";
import validate from "../middleware/validation.ts";
import { zodRegisterSchema, zodLoginSchema } from "../models/userModel.ts";

const router = Router();

// Tags
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The authentication routes!
 */
// Routes
/**
 * @swagger
 * /auth/signup:
 *   post:
 *     tags: [Auth]
 *     summary: User registration!
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successfully signed up!
 *       400:
 *         description: Bad request/Missing data!
 *       500:
 *         description: Some server error!
 */
router.post("/signup", validate(zodRegisterSchema), methods.register);
/**
 * @swagger
 * /auth/signin:
 *   post:
 *     tags: [Auth]
 *     summary: Logs the user in!
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Signed in successfully!
 *       400:
 *         description: Bad request/Missing data!
 *       500:
 *         description: Some server error!
 */
router.post("/signin", validate(zodLoginSchema), methods.login);
/**
 * @swagger
 * /auth/signout:
 *   get:
 *     tags: [Auth]
 *     summary: Logs out the user!
 *     responses:
 *       200:
 *         description: Signed out successfully!
 *       500:
 *         description: Some server error!
 */
router.get("/signout", methods.logout);

export default router;
