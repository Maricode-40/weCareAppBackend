import { Request, Response } from "express";
import { User } from "../models/User";
import { UserRoles } from "../constants/UserRoles";
import bcrypt from "bcrypt";
import { Role } from "../models/Role";

export const userController = {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { firstName, lastName, email, password, isActive } = req.body;

      if (!firstName || !lastName || !email || !password || !isActive) {
        //console.log("Datos recibidos:", JSON.stringify(req.body, null, 2));
        res.status(400).json({
          message: "All fields must be provided",
        });
        return;
      }

      const hashedPassword = bcrypt.hashSync(password, 10);

      const userToCreate = User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        isActive: isActive,
        role: UserRoles.CLIENT,
      });

      // SAVE TO DB
      await User.save(userToCreate);

      res.status(201).json({
        message: "User has been created",
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to create user",
      });
    }
  },

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const page = Number(req.query.page) || 2;
      const limit = Number(req.query.limit) || 10;

      const [users, totalUsers] = await User.findAndCount({
        relations: {
          role: true,
        },
        select: {
          role: {
            name: true,
          },
        },
        skip: (page - 1) * limit,
        take: limit,
      });

      if (totalUsers === 0) {
        res.status(404).json({ message: "Users not found" });
        return;
      }

      const totalPages = Math.ceil(totalUsers / limit);

      res.status(200).json({
        users: users,
        current_page: page,
        per_page: limit,
        total_pages: totalPages,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to retrieve users",
      });
    }
  },

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const userId = Number(req.params.id);
      const user = await User.findOne({
        relations: {
          role: true,
        },
        where: { id: userId },
      });
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({
        message: "Failed to get userById",
      });
    }
  },

  async update(
    req: Request<{ id: string }, {}, Partial<User>, {}>,
    res: Response
  ): Promise<void> {
    //to Type the Request<Params, Response, Body, Query>,
    try {
      const userId = Number(req.params.id);

      const { password, role, ...resUserData } = req.body;

      const userToUpdate = await User.findOne({
        where: { id: userId },
      });
      if (!userToUpdate) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      if (password) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        userToUpdate.password = hashedPassword;
      }

      const updatedUser: Partial<User> = {
        ...userToUpdate,
        ...resUserData,
      };

      await User.save(updatedUser);

      res.status(202).json({ message: "User updated successfully" });
    } catch (error) {
      res.status(500).json({
        message: "Failed to update user",
      });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      //take the id from the request
      const userId = Number(req.params.id);
      //find the user by id
      const user = await User.findOne({ where: { id: userId } });
      //if the user is not found, return a 404 status
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      //remove the user
      await user.remove();
      //return a 200 status
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      //if something goes wrong, return a 500 status
      res.status(500).json({ message: "Something went wrong" });
    }
  },

  async editUserRole(req: Request, res: Response) {
    try {
      //take the user id from the request
      const userId = Number(req.params.id);

      //take the role id from the request
      const roleId = Number(req.body.roleId);

      //find the user by id
      const userToChange = await User.findOne({
        relations: {
          role: true,
        },
        select: {
          id: true,
          firstName: true,
          role: {
            id: true,
          },
        },
        where: {
          id: userId,
        },
      });
      //if the user is not found, return a 404 status
      if (!userToChange) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      //change the role of the user
      userToChange.role.id = roleId;

      //save the user in DB
      await User.save(userToChange);

      //return a 200 status
      res.status(200).json({ message: "Role updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  },

  async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.tokenData.userId;

      const user = await User.findOne({
        relations: {
          role: true,
        },
        where: { id: userId },
      });

      res.json(user);
    } catch (error) {
      res.status(500).json({
        message: "Failed to retrieve user",
      });
    }
  },

  async updateProfile(
    req: Request<{}, {}, Partial<User>, {}>,
    res: Response
  ): Promise<void> {
    //para tipar el Request<Params, Response, Body, Query>,
    try {
      const userId = req.tokenData.userId;

      const { password, role, ...resUserData } = req.body;

      const userToUpdate = await User.findOne({
        where: { id: userId },
      });

      if (password) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        userToUpdate!.password = hashedPassword;
      }

      const updatedUser: Partial<User> = {
        ...userToUpdate,
        ...resUserData,
      };

      await User.save(updatedUser);

      res.status(202).json({ message: "User updated successfully" });
    } catch (error) {
      res.status(500).json({
        message: "Failed to update user",
      });
    }
  },
  
};
