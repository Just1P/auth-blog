import express, { Request, Response } from "express";
import cors from "cors";
import PostController from "./post/posts.controller";
import LoggerService from "./middleware/logger.middleware";
import UsersController from "./user/users.controller";

const app = express();
const port = 8000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(LoggerService);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello !");
});

app.use("/posts", PostController);
app.use("/users", UsersController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
