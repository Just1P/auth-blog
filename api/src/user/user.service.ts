import { Request, Response } from "express";
import pool from "../config/databse.config";
import { IUser, IUserDTO } from "./user.types";

const getAll = async (req: Request, res: Response) => {
  try {
    const query = "SELECT * FROM users";
    const result = await pool.query(query);

    const users: IUser[] = result.rows;

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching users." });
  }
};

const getOneByUsername = async (username: string): Promise<IUser | null> => {
  const query = "SELECT * FROM users WHERE username = $1";
  const values = [username];

  const result = await pool.query(query, values);
  const user = result.rows[0];

  if (!user) {
    return null;
  }

  return user;
};

const getOneById = async (id: number): Promise<IUser | null> => {
  const query = "SELECT * FROM users WHERE id = $1";
  const values = [id];

  try {
    const result = await pool.query(query, values);
    const user = result.rows[0];

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

const create = async (userDTO: IUserDTO) => {
  const query = "INSERT INTO users (username, password) VALUES ($1, $2)";
  const values = [userDTO.username, userDTO.password];

  try {
    await pool.query(query, values);

    return true;
  } catch (error) {
    console.error("Error creating user:", error);
    return false;
  }
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, password } = req.body;

  if (!id || (!username && !password)) {
    return res.status(400).json({ message: "Invalid input data." });
  }

  const fieldsToUpdate = [];
  const values: (string | number)[] = [];
  let query = "UPDATE users SET ";

  if (username) {
    fieldsToUpdate.push("username = $1");
    values.push(username);
  }

  if (password) {
    fieldsToUpdate.push("password = $" + (values.length + 1));
    values.push(password);
  }

  query += fieldsToUpdate.join(", ");
  query += " WHERE id = $" + (values.length + 1);
  values.push(Number(id));

  try {
    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User updated successfully." });
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the user." });
  }
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Invalid input data." });
  }

  const query = "DELETE FROM users WHERE id = $1";
  const values = [Number(id)];

  try {
    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User removed successfully." });
  } catch (error) {
    console.error("Error removing user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while removing the user." });
  }
};

export default {
  getAll,
  getOneById,
  create,
  update,
  remove,
  getOneByUsername,
};
