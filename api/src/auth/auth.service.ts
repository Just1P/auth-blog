import userService from "../user/user.service";
import { IUserDTO } from "../user/user.types";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

const signin = async (userDTO: IUserDTO) => {
  // Check if user exists
  const user = await userService.getOneByUsername(userDTO.username);

  if (!user) {
    return null;
  }

  if (user.password !== userDTO.password) {
    return null;
  }

  const access_token = jwt.sign(
    { id: user.id, username: user.username },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return access_token;
};

const signup = async (userDTO: IUserDTO) => {
  return userService.create(userDTO);
};

export default {
  signin,
  signup,
};
