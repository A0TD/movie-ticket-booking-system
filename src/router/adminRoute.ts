import { Router } from "express";
import { authenticate, authorize } from "../middleware/authGuard.ts";
import * as methods from "../controller/adminController.ts";

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: The admin routes!
 */

/**
 * @swagger
 * /admin/users:
 *   get:
 *     tags: [Admin]
 *     summary: Returns a list of all users!
 *     responses:
 *       200:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       403:
 *         description: Unauthorized access!
 *       500:
 *         description: Some server error!
 */
router.get("/users", authorize, methods.getAllUsers);
/**
 * @swagger
 * /admin/requestAdmin:
 *   post:
 *     tags: [Admin]
 *     summary: Grants Cinema Admin Role!
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              admin_key:
 *                type: string
 *                description: The key required to grant admin access!
 *     responses:
 *       200:
 *         description: Sucessfully granted admin access!
 *       400:
 *         description: Invalid admin key!
 *       401:
 *         description: Unauthenticated access!
 *       500:
 *         description: Some server error!
 */
router.post("/requestAdmin", authenticate, methods.requestAdmin);

export default router;
