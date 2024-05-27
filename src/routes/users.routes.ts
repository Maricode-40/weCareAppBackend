import express from "express";

// const created with express router
const router = express.Router();

///////// Profile Routes -user //////

// Create user

//get loged user profile
router.get("/profile", (req, res) => {
  res.send("get first profile ");
});

//Update loged user profile
router.put("/profile", (req, res) => {
  res.send("put first profile ");
});

//get user by ID
router.get("/:id", (req, res) => {
  res.send("get user by ID");
});
//////Protected Routes////

// Edit user role

// get all users with role superadmin
router.get("/", (req, res) => {
  res.send("get ALL  USSERSS");
});
//create user

router.post("/", (req, res) => {
  res.send("create new user");
});
// edit user
router.put("/:id", (req, res) => {
  res.send("update USER -BY ID ");
});

// delete user

router.delete("/:id", (req, res) => {
  res.send("delete user");
});

//Get all users with role client ??? wtf WTF

export default router;
