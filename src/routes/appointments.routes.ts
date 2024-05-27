import express from "express";

const router = express.Router();

//APpointments routes

//create appointments
router.post("/", (req, res) => {
  res.send("create new appointments");
});

//update appointments
router.put("/:id", (req, res) => {
  res.send("update appointments");
});

router.delete("/:id", (req, res) => {
  res.send("delete appointments");
});
router.get("/clients", (req, res) => {
  res.send("get  all client appointments");
});

router.get("/webcreator", (req, res) => {
  res.send("get all  appointments as webcreator");
});

///////////// PROTECTED ROUTES
// GET ALL
router.get("/", (req, res) => {
  res.send("get  ALLLL appointments");
});

// GET APPOINTS BY id
router.get("/:id", (req, res) => {
  res.send("get by id appointments");
});

export default router;
