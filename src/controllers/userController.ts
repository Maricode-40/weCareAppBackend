import { Request, Response } from "express";
import { User } from "../models/User";

export const userController = {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to get All users" });
    }
  },

  async getById(req: Request, res: Response): Promise<void> {
    const userId = Number(req.params.id);

    const user = await User.findOne({ where: { id: userId } });
    res.json(user);
  },
};
