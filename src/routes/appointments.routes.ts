import express from "express";
import { auth } from "../middlewares/auth";
import { appointmentController } from "../controllers/appointmentController";

const router = express.Router();

//APpointments routes

//create appointments - needs to check -canot create one
//New Appointment
router.post("/", auth, appointmentController.create);

//update appointments- ok but needs to check outcome of update
router.put("/:id", auth, appointmentController.update);

router.delete("/:id", auth, appointmentController.delete);
router.get("/clients", (req, res) => {
  res.send("get  all client appointments");
});


router.get("/webcreator", (req, res) => {
  res.send("get all  appointments as webcreator");
});

///////////// PROTECTED ROUTES
// GET ALL appointments as superadmin
router.get("/", auth, appointmentController.getAll);

// GET APPOINTS BY id
router.get("/:id", auth, appointmentController.getById);

//protected routes / get appointment list

//get details of appointment date- BY ID
//router.get("/:id",auth, //authorize(["superadmin"]), appointmentController.getAppointsById);

export default router;
