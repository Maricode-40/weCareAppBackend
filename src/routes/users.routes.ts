import express from "express";
import { User } from "../models/User";
import { userController } from "../controllers/userController";

// const created with express router
const router = express.Router();

///////// Profile Routes -user //////

// Create user

//get loged user profile
router.get("/profile", (req, res) => {
  res.send("get first profile- client data");
});

//Update loged user profile-double check result
router.put("/profile", (req, res) => {
  res.send("put first profile ");
});

//get user by ID- ***doublce check result in this route and
router.get("/:id", userController.getById);
// ///// implement async -await and move it to user- controllers///

/////////PROTECTED ROUTES///

// Edit user role
router.put("/:id/role", userController.editUserRole);
// GET ALL users by Role SUPERADMIN
///**** array type of objects moving to usercontroller ////
router.get("/", userController.getAll);
//Create user
router.post("/", userController.create);
// edit user
router.put("/:id", userController.update);

// delete user
router.delete("/:id", userController.delete);

//Get all users with role client ??? wtf WTF
//
export default router;
