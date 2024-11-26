import { Router } from "express";
import UsersServcie from "./users.service";

const UsersController = Router();

UsersController.get("/", UsersService.getAll);
UsersController.get("/:id", UsersService.getOne);
UsersController.post("/", UsersService.create);
UsersController.put("/:id", UsersService.update);
UsersController.delete("/:id", UsersService.remove);

export default UsersController;
