import { Router } from "express";
import PostsService from "./posts.service";
import authMiddleware from "../middleware/auth.middleware";
import logger from "../middleware/logger.middleware";

const PostsController = Router();

PostsController.use(logger);

PostsController.get("/user-posts", authMiddleware, async (req, res) => {
  try {
    await PostsService.getPostsByUser(req, res);
  } catch (error) {
    console.error("Error fetching user's posts:", error);
    res.status(500).send("An error occurred while fetching user's posts.");
  }
});

PostsController.get("/", async (req, res) => {
  try {
    await PostsService.getAll(req, res);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send("An error occurred while fetching posts.");
  }
});

PostsController.get("/:id", async (req, res) => {
  try {
    await PostsService.getOne(req, res);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).send("An error occurred while fetching the post.");
  }
});

PostsController.post("/", authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    console.log("User making the request:", user);

    await PostsService.create(req, res);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).send("An error occurred while creating the post.");
  }
});

PostsController.put("/:id", authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    console.log("Updating post for user:", user);

    await PostsService.update(req, res);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).send("An error occurred while updating the post.");
  }
});

PostsController.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    console.log("Deleting post for user:", user);

    await PostsService.remove(req, res);
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).send("An error occurred while deleting the post.");
  }
});

export default PostsController;
