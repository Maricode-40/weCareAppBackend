import express from "express";

const router = express.Router();
/// WEBCREATOR ROUTES

////////////PUBLIC ROUTES//
// get all webcreators
router.get("/", (req, res) => {
  res.send("List of webcreators");
});

//GET WEBCRBYID AND DETAILS
router.get("/:id", (req, res) => {
  res.send("by ID- detalles del webcreator");
});

////////////////Protected routes//
router.post("/", (req, res) => {
  res.send("New webcreator");
});

router.put("/:id", (req, res) => {
  res.send("update webcreators");
});
router.delete("/:id", (req, res) => {
  res.send("delete webcreators");
});

export default router;
