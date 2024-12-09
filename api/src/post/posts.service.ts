import { Request, Response } from "express";
import connection from "../config/databse.config";

const getAll = async (req: Request, res: Response) => {
  const sql = "SELECT * FROM posts ORDER BY created_at DESC";

  connection.query(sql, (error, results) => {
    if (error) {
      console.error("Error while fetching posts:", error);
      res.status(500).send({ error: "Error while fetching posts" });
      return;
    }

    res.status(200).send(results.rows);
  });
};

const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;

  const sql = "SELECT * FROM posts WHERE id = $1";
  const values = [id];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error("Error while fetching posts:", error);
      res.status(500).send({ error: "Error while fetching posts" });
      return;
    }

    if (Array.isArray(results.rows) && results.rows.length === 0) {
      res.status(404).send({ error: "posts not found" });
      return;
    }

    res.status(200).send(results.rows[0]);
  });
};

const create = async (req: Request, res: Response) => {
  const { user_id, title, content, image_path } = req.body;

  if (!user_id || !title || !content) {
    res
      .status(400)
      .send({ error: "Missing required fields: user_id, title, content" });
    return;
  }

  const sql =
    "INSERT INTO posts (user_id, title, content, created_at, image_path) VALUES ($1, $2, $3, NOW(), $4) RETURNING *";
  const values = [user_id, title, content, image_path || null];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error("Error while creating posts:", error);
      res.status(500).send({ error: "Error while creating posts" });
      return;
    }

    res.status(201).send({
      message: "posts created successfully",
      posts: results.rows[0],
    });
  });
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, image_path } = req.body;

  if (!title && !content && !image_path) {
    res.status(400).send({ error: "No fields to update" });
    return;
  }

  const sqlSelect = "SELECT * FROM posts WHERE id = $1";
  const sqlUpdate =
    "UPDATE posts SET title = $1, content = $2, image_path = $3 WHERE id = $4 RETURNING *";

  connection.query(sqlSelect, [id], (error, results) => {
    if (error) {
      console.error("Error while fetching posts for update:", error);
      res.status(500).send({ error: "Error while fetching posts" });
      return;
    }

    if (Array.isArray(results.rows) && results.rows.length === 0) {
      res.status(404).send({ error: "posts not found" });
      return;
    }

    const currentposts = results.rows[0];
    const values = [
      title || currentposts.title,
      content || currentposts.content,
      image_path || currentposts.image_path,
      id,
    ];

    connection.query(sqlUpdate, values, (error, updateResults) => {
      if (error) {
        console.error("Error while updating posts:", error);
        res.status(500).send({ error: "Error while updating posts" });
        return;
      }

      res.status(200).send({
        message: "posts updated successfully",
        posts: updateResults.rows[0],
      });
    });
  });
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  const sqlSelect = "SELECT * FROM posts WHERE id = $1";
  const sqlDelete = "DELETE FROM posts WHERE id = $1 RETURNING *";

  connection.query(sqlSelect, [id], (error, results) => {
    if (error) {
      console.error("Error while fetching posts for delete:", error);
      res.status(500).send({ error: "Error while fetching posts" });
      return;
    }

    if (Array.isArray(results.rows) && results.rows.length === 0) {
      res.status(404).send({ error: "posts not found" });
      return;
    }

    connection.query(sqlDelete, [id], (error, deleteResults) => {
      if (error) {
        console.error("Error while deleting posts:", error);
        res.status(500).send({ error: "Error while deleting posts" });
        return;
      }

      res.status(200).send({
        message: "posts deleted successfully",
        posts: deleteResults.rows[0],
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
