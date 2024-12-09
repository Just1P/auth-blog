import { Request, Response, Router } from "express";
import UserService from "./user.service";

const UserController = Router();

UserController.get("/", UserService.getAll);
UserController.post("/", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const userDTO = { username, password };
  const user = await UserService.create(userDTO);

  res.status(201).send(user);
});
UserController.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await UserService.getOneById(+id);
  if (!user) {
    res.status(404).send("User not found");
  }

  res.send(user);
});
UserController.get("/:id", UserService.update);
UserController.get("/:id", UserService.remove);

export default UserController;
