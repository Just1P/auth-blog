import { Router } from "express";
import AuthService from "./auth.service";

const AuthController = Router();

AuthController.post("/signin", AuthService.signin);
AuthController.post("/signup", AuthService.signin);

export default AuthController;
