import { Request, Response, Router } from "express";
import AuthService from "./auth.service";

const AuthController = Router();

AuthController.post("/signin", async (req: Request, res: Response) => {
  console.log("Request body:", req.body); // Log des identifiants envoyés
  const { username, password } = req.body;

  const userDTO = { username, password };
  const access_token = await AuthService.signin(userDTO);

  if (access_token) {
    console.log("Token generated:", access_token); // Log du token généré
    res.status(200).send({ access_token });
  } else {
    console.error("Invalid credentials");
    res.status(401).send({ message: "Invalid credentials" });
  }
});
AuthController.post("/signup", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const userDTO = { username, password };

  const result = await AuthService.signup(userDTO);

  if (result) {
    res.status(201).send({ message: "User created" });
  } else {
    res.status(400).send({ message: "User not created" });
  }
});

export default AuthController;
