import { Router } from "express";
import usersService from "./users.service";

const UsersController = Router();

UsersController.get("/", usersService.getAll);
UsersController.get("/:id", usersService.getOne);
UsersController.post("/", usersService.create);
UsersController.put("/:id", usersService.update);
UsersController.delete("/:id", usersService.remove);

export default UsersController;
