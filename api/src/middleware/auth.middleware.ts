import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userService from "../user/user.service";

dotenv.config();

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      res.status(401).json({ error: "Token not found" });
      return;
    }

    const tokenParts = token.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      res.status(401).json({ error: "Invalid token format" });
      return;
    }

    const access_token = tokenParts[1];

    const decoded = jwt.verify(
      access_token,
      process.env.JWT_SECRET as string
    ) as { id: number; username: string; exp: number };

    if (decoded.exp < Date.now() / 1000) {
      res.status(401).json({ error: "Token expired" });
      return;
    }

    const user = await userService.getOneByUsername(decoded.username);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    (req as any).user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
};

export default authMiddleware;
