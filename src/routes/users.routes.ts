import express from "express";
import { User } from "../models/User";
import { userController } from "../controllers/userController";
import { auth } from "../middlewares/auth";

// const created with express router
const router = express.Router();

///////// Profile Routes -user //////


// Create user

//get loged user profile
router.get("/profile", auth, userController.getProfile);

//Update loged user profile-double check result
router.put("/profile", auth, userController.updateProfile);



/////////PROTECTED ROUTES///
// Edit user role
router.put("/:id/role", auth, userController.editUserRole);
// GET ALL users by Role SUPERADMIN
///**** array type of objects moving to usercontroller ////
router.get("/", auth, userController.getAll);
//Create user
router.post("/", auth, userController.create);
// edit user
router.put("/:id", auth, userController.update);

// delete user
router.delete("/:id", auth, userController.delete);

//get user by ID- ***doublce check result in this route and
router.get("/:id", auth, userController.getById);
// ///// implement async -await and move it to user- controllers///

//Get all users with role client ??? wtf WTF
//

export default router;
