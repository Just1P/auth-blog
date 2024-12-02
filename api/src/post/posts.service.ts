import { Request, Response } from "express";

const getAll = async (req: Request, res: Response) => {
  res.send("Get all");
};

const getOne = async (req: Request, res: Response) => {
  res.send("Get One");
};

const create = async (req: Request, res: Response) => {
  res.send("Create One");
};

const update = async (req: Request, res: Response) => {
  res.send("Update");
};

const deleteOne = async (req: Request, res: Response) => {
  res.send("Delete");
};

export default {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
};
