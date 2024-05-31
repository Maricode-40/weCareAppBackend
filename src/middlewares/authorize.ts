import { NextFunction, Request, Response } from "express";
import { UserRoles } from "../constants/UserRoles";

export const authorize = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.tokenData.userRole;

    //console.log(UserRoles.SUPERADMIN.name);

    // Default access as superadmin
    if (userRole === UserRoles.SUPERADMIN.name) {
      return next();
    }

    // Access if -the user role is in allowed roles
    if (allowedRoles.includes(userRole)) {
      return next();
    }
    return res.status(403).json({
      message: "Unauthorized access",
    });
  };
};
