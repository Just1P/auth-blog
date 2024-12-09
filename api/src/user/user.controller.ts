import { Request, Response, Router } from "express";
import UserService from "./user.service";

const UserController = Router();

UserController.get("/", UserService.getAll);

UserController.post("/", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const userDTO = { username, password };

  try {
    const user = await UserService.create(userDTO);
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("An error occurred while creating the user.");
  }
});

UserController.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await UserService.getOneById(+id);
  if (!user) {
    res.status(404).send("User not found");
  }

  res.send(user);
});

UserController.put("/:id", async (req: Request, res: Response) => {
  try {
    await UserService.update(req, res);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("An error occurred while updating the user.");
  }
});

UserController.delete("/:id", async (req: Request, res: Response) => {
  try {
    await UserService.remove(req, res);
  } catch (error) {
    console.error("Error removing user:", error);
    res.status(500).send("An error occurred while removing the user.");
  }
});

export default UserController;
