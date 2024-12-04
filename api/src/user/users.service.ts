import { Request, Response } from "express";
import connection from "../config/databse.config";

const getAll = async (req: Request, res: Response) => {
  connection.query(
    "SELECT * FROM user ORDER BY created_at DESC",
    (error, results) => {
      if (error) {
        res.status(500).send({ error: "Error while fetching user" });
        return;
      }
      res.status(200).send(results.rows);
    }
  );
};

const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const sql = "SELECT * FROM user WHERE id = $1";
  const values = [id];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error("Error while fetching user:", error);

      res.status(500).send({ error: "Error while fetching user" });
      return;
    }

    if (Array.isArray(results.rows) && results.rows.length === 0) {
      res.status(404).send({ error: "User not found" });
      return;
    }

    res.status(200).send(results.rows[0]);
  });
};

const create = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    res.status(400).send({ error: "Missing required fields" });
    return;
  }

  const sql =
    "INSERT INTO user (username, password, email, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id";
  const values = [username, password, email];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error("Error while creating user:", error);
      res.status(500).send({ error: "Error while creating user" });
      return;
    }

    res.status(201).send({
      message: "User created successfully",
      userId: results.rows[0].id,
    });
  });
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, password, email } = req.body;

  if (!username && !password && !email) {
    res.status(400).send({ error: "No fields to update" });
    return;
  }

  const sqlSelect = "SELECT * FROM user WHERE id = $1";
  const sqlUpdate =
    "UPDATE user SET username = $1, password = $2, email = $3 WHERE id = $4 RETURNING *";

  connection.query(sqlSelect, [id], (error, results) => {
    if (error) {
      console.error("Error while fetching user for update:", error);
      res.status(500).send({ error: "Error while fetching user" });
      return;
    }

    if (Array.isArray(results.rows) && results.rows.length === 0) {
      res.status(404).send({ error: "User not found" });
      return;
    }

    const values = [
      username || results.rows[0].username,
      password || results.rows[0].password,
      email || results.rows[0].email,
      id,
    ];

    connection.query(sqlUpdate, values, (error, updateResults) => {
      if (error) {
        console.error("Error while updating user:", error);
        res.status(500).send({ error: "Error while updating user" });
        return;
      }

      res.status(200).send({
        message: "User updated successfully",
        user: updateResults.rows[0],
      });
    });
  });
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  const sqlSelect = "SELECT * FROM user WHERE id = $1";
  const sqlDelete = "DELETE FROM user WHERE id = $1 RETURNING *";

  connection.query(sqlSelect, [id], (error, results) => {
    if (error) {
      console.error("Error while fetching user for delete:", error);
      res.status(500).send({ error: "Error while fetching user" });
      return;
    }

    if (Array.isArray(results.rows) && results.rows.length === 0) {
      res.status(404).send({ error: "User not found" });
      return;
    }

    connection.query(sqlDelete, [id], (error, deleteResults) => {
      if (error) {
        console.error("Error while deleting user:", error);
        res.status(500).send({ error: "Error while deleting user" });
        return;
      }

      res.status(200).send({
        message: "User deleted successfully",
        user: deleteResults.rows[0],
      });
    });
  });
};

export default {
  getAll,
  getOne,
  create,
  update,
  remove,
};
