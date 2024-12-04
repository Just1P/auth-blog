import { Request, Response } from "express";
import AuthController from "./auth.controller";

const signin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  res.send("signin");
};

const signup = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  res.send("signin");
};

export default {
  signin,
  signup,
};
