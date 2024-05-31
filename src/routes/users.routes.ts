import express from "express";
import { userController } from "../controllers/userController";
import { auth } from "../middlewares/auth";
import { authorize } from "../middlewares/authorize";

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
router.put(
  "/:id/role",
  auth,
  authorize(["superadmin"]),
  userController.editUserRole
);
// GET ALL users by Role SUPERADMIN
///**** array type of objects moving to usercontroller ////
router.get("/", auth, authorize(["superadmin"]), userController.getAll);
//Create user
router.post("/", auth, authorize(["superadmin"]), userController.create);
// edit user
router.put("/:id", auth, authorize(["superadmin"]), userController.update);

// delete user
router.delete("/:id", auth, authorize(["superadmin"]), userController.delete);

//get user by ID 
router.get("/:id", auth, authorize(["superadmin"]), userController.getById);
// ///// implement async -await and move it to user- controllers///

//Get all users with role client ??? wtf WTF
//

export default router;
