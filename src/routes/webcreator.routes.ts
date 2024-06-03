import express from "express";
import { webcreatorController } from "../controllers/webcreatorController";
import { auth } from "../middlewares/auth";
import { authorize } from "../middlewares/authorize";

const router = express.Router();
/// WEBCREATOR ROUTES

////////////PUBLIC ROUTES//
// get all webcreators
router.get("/", webcreatorController.getAll);

//GET WEBCRBYID AND DETAILS
router.get("/:id", (req, res) => {
  res.send("by ID- detalles del webcreator");
});

////////////////Protected routes//
router.post("/", auth, authorize(["superadmin"]), webcreatorController.create);

router.put("/:id", (req, res) => {
  res.send("update webcreators");
});
router.delete("/:id", (req, res) => {
  res.send("delete webcreators");
});

export default router;
