import { Request, Response } from "express";
import { Webcreator } from "../models/Webcreator";
import { User } from "../models/User";
import { UserRoles } from "../constants/UserRoles";

export const webcreatorController = {
  async getAll(req: Request, res: Response) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const webcreators = await Webcreator.findAndCount({
        relations: {
          user: true,
        },

        select: {
          user: {
            firstName: true,
            email: true,
          },
        },
      });
      res.json(webcreators);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { firstName, email, password, style, area } = req.body;

      if (!firstName || !email || !password || !style || !area) {
        res.status(400).json({ message: "Failed to create artist" });
        return;
      }

      const userExists = await User.findOne({ where: { email: email } });

      if (userExists) {
        res.status(400).json({ message: "Email already in use" });
        return;
      }

      const user = User.create({
        firstName: firstName,
        email: email,
        password: password,
        role: UserRoles.WEBCREATOR,
      });

      await User.save(user);

      const webcreator = Webcreator.create({
        style: style,
        area: area,
        user: user,
      });

      await Webcreator.save(webcreator);

      res.status(201).json({ message: "Webcreator created succesfully" });
    } catch (error) {}
  },
};

 