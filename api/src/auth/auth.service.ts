import userService from "../user/user.service";
import { IUserDTO } from "../user/user.types";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

const signin = async (userDTO: IUserDTO) => {
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


export const signup = async (userDTO: IUserDTO): Promise<boolean> => {
  const { username, password } = userDTO;

  const existingUser = await userService.getOneByUsername(username);
  if (existingUser) {
    throw new Error("Username already exists");
  }


  // Création de l'utilisateur
  const createdUser = await userService.create({
    username,
    password
  });

  return !!createdUser; 
};

export default {
  signin,
  signup,
};