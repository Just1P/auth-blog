import { Request, Response, Router } from "express";
import AuthService from "./auth.service";

const AuthController = Router();

AuthController.post("/signin", async (req: Request, res: Response) => {
  console.log("Request body:", req.body);
  const { username, password } = req.body;

  const userDTO = { username, password };
  const access_token = await AuthService.signin(userDTO);

  if (access_token) {
    console.log("Token generated:", access_token);
    res.status(200).send({ access_token });
  } else {
    console.error("Invalid credentials");
    res.status(401).send({ message: "Invalid credentials" });
  }
});
AuthController.post("/signup", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const userDTO = { username, password };

    const result = await AuthService.signup(userDTO);

    if (result) {
      res.status(201).send({ message: "User created successfully" });
    }
  } catch (error) {
    // Vérifiez si `error` est une instance d'Error
    if (error instanceof Error) {
      console.error("Signup error:", error.message);

      if (error.message === "Username already exists") {
        res.status(400).send({ message: error.message });
      } else {
        res.status(500).send({ message: "An error occurred during signup" });
      }
    } else {
      // Cas où `error` n'est pas une instance d'Error
      console.error("Unexpected error:", error);
      res.status(500).send({ message: "An unknown error occurred" });
    }
  }
});



export default AuthController;