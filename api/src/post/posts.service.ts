import { Request, Response } from "express";
import connection from "../config/databse.config";

const getAll = async (req: Request, res: Response) => {
  const sql = `
    SELECT 
      posts.*, 
      users.username AS creator_name 
    FROM posts
    JOIN users ON posts.user_id = users.id
    ORDER BY posts.created_at DESC
  `;

  connection.query(sql, (error, results) => {
    if (error) {
      console.error("Error while fetching posts:", error);
      res.status(500).send({ error: "Error while fetching posts" });
      return;
    }
    console.log(results.rows);
    res.status(200).send(results.rows);
  });
};

const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;

  const sql = `
    SELECT 
      posts.*, 
      users.username AS creator_name 
    FROM posts
    JOIN users ON posts.user_id = users.id
    WHERE posts.id = $1
  `;
  const values = [id];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error("Error while fetching post:", error);
      res.status(500).send({ error: "Error while fetching post" });
      return;
    }

    if (results.rows.length === 0) {
      res.status(404).send({ error: "Post not found" });
      return;
    }

    res.status(200).send(results.rows[0]);
  });
};

const create = async (req: Request, res: Response) => {
  const { title, content, image_path } = req.body;
  const user = (req as any).user;

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

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, image_path } = req.body;
  const user = (req as any).user;

  if (!user || !user.id) {
    return res.status(403).send({ error: "Unauthorized" });
  }

  if (!title && !content && !image_path) {
    return res.status(400).send({ error: "No fields to update" });
  }

  const sqlSelect = "SELECT * FROM posts WHERE id = $1";
  try {
    const result = await connection.query(sqlSelect, [id]);

    if (result.rows.length === 0) {
      return res.status(404).send({ error: "Post not found" });
    }

    const post = result.rows[0];
    if (post.user_id !== user.id) {
      return res
        .status(403)
        .send({ error: "You are not the owner of this post" });
    }

    const sqlUpdate =
      "UPDATE posts SET title = $1, content = $2, image_path = $3 WHERE id = $4 RETURNING *";
    const valuesUpdate = [
      title || post.title,
      content || post.content,
      image_path || post.image_path,
      id,
    ];

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

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;

  if (!user || !user.id) {
    return res.status(403).send({ error: "Unauthorized" });
  }

  const sqlSelect = "SELECT * FROM posts WHERE id = $1";
  try {
    const result = await connection.query(sqlSelect, [id]);

    if (result.rows.length === 0) {
      return res.status(404).send({ error: "Post not found" });
    }

    const post = result.rows[0];
    if (post.user_id !== user.id) {
      return res
        .status(403)
        .send({ error: "You are not the owner of this post" });
    }

    const sqlDelete = "DELETE FROM posts WHERE id = $1 RETURNING *";
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

const getPostsByUser = async (req: Request, res: Response) => {
  const user = req.user;

  if (!user || !user.id) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const sql = `
    SELECT 
      posts.*, 
      users.username AS creator_name 
    FROM posts
    JOIN users ON posts.user_id = users.id
    WHERE posts.user_id = $1
    ORDER BY posts.created_at DESC
  `;
  const values = [user.id];

  try {
    const results = await connection.query(sql, values);
    res.status(200).json(results.rows);
  } catch (error) {
    console.error("Error while fetching user's posts:", error);
    res.status(500).json({ error: "An error occurred while fetching posts" });
  }
};

export default {
  getAll,
  getOne,
  create,
  update,
  remove,
  getPostsByUser,
};
