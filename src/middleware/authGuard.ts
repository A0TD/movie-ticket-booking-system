import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.status(401).send("Authentication failure!");

    const user = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number;
      role: string;
    };

    res.locals.user = user;

    next();
  } catch (error) {
    console.error(`Error caught: ${error}`);
    res.status(500).send(`Error caught: ${error}`);
  }
};

const authorize = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.status(401).send("Authentication failure!");

    const user = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number;
      role: string;
    };

    if (user.role !== "Admin")
      return res.status(403).send("Authorization failure!");

    res.locals.user = user;

    next();
  } catch (error) {
    console.error(`Error caught: ${error}`);
    res.status(500).send(`Error caught: ${error}`);
  }
};

export { authenticate, authorize };
