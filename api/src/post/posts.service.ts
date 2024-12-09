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
  const { title, content, image_path } = req.body;
  const user = (req as any).user; // Récupérer l'utilisateur connecté

  if (!user || !user.id) {
    return res.status(403).send({ error: "Unauthorized" });
  }

  const sql =
    "INSERT INTO posts (user_id, title, content, created_at, image_path) VALUES ($1, $2, $3, NOW(), $4) RETURNING *";
  const values = [user.id, title, content, image_path || null];

  try {
    const result = await connection.query(sql, values);
    res.status(201).send({
      message: "Post created successfully",
      post: result.rows[0],
    });
  } catch (error) {
    console.error("Error while creating post:", error);
    res
      .status(500)
      .send({ error: "An error occurred while creating the post" });
  }
};

const update = async (req: Request, res: Response, userId: number) => {
  const { id } = req.params;
  const { title, content, image_path } = req.body;

  if (!title && !content && !image_path) {
    return res.status(400).send({ error: "No fields to update" });
  }

  // Vérifier si le post existe et appartient à l'utilisateur
  const sqlSelect = "SELECT * FROM posts WHERE id = $1";
  const result = await connection.query(sqlSelect, [id]);

  if (result.rows.length === 0) {
    return res.status(404).send({ error: "Post not found" });
  }

  const post = result.rows[0];
  if (post.user_id !== userId) {
    return res
      .status(403)
      .send({ error: "You are not the owner of this post" });
  }

  // Mise à jour du post
  const sqlUpdate =
    "UPDATE posts SET title = $1, content = $2, image_path = $3 WHERE id = $4 RETURNING *";
  const valuesUpdate = [
    title || post.title,
    content || post.content,
    image_path || post.image_path,
    id,
  ];

  try {
    const updateResult = await connection.query(sqlUpdate, valuesUpdate);

    res.status(200).send({
      message: "Post updated successfully",
      post: updateResult.rows[0],
    });
  } catch (error) {
    console.error("Error while updating post:", error);
    res
      .status(500)
      .send({ error: "An error occurred while updating the post" });
  }
};

const remove = async (req: Request, res: Response, userId: number) => {
  const { id } = req.params;

  // Vérifier si le post existe et appartient à l'utilisateur
  const sqlSelect = "SELECT * FROM posts WHERE id = $1";
  const result = await connection.query(sqlSelect, [id]);

  if (result.rows.length === 0) {
    return res.status(404).send({ error: "Post not found" });
  }

  const post = result.rows[0];
  if (post.user_id !== userId) {
    return res
      .status(403)
      .send({ error: "You are not the owner of this post" });
  }

  // Supprimer le post
  const sqlDelete = "DELETE FROM posts WHERE id = $1 RETURNING *";
  try {
    const deleteResult = await connection.query(sqlDelete, [id]);

    res.status(200).send({
      message: "Post deleted successfully",
      post: deleteResult.rows[0],
    });
  } catch (error) {
    console.error("Error while deleting post:", error);
    res
      .status(500)
      .send({ error: "An error occurred while deleting the post" });
  }
};

export default {
  getAll,
  getOne,
  create,
  update,
  remove,
};
