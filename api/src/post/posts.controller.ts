import { Router } from "express";
import PostsService from "./posts.service";

const PostsController = Router();

PostsController.get("/", PostsService.getAll);
PostsController.get("/:id", PostsService.getOne);
PostsController.post("/", PostsService.create);
PostsController.put("/:id", PostsService.update);
PostsController.delete("/:id", PostsService.remove);

export default PostsController;
