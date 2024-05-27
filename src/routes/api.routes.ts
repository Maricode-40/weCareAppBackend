import express from "express";
import userRoutes from "./users.routes";
import baseRoutes from "./ base.routes";
import webcreatorRoutes from "./webcreator.routes";
import appointmentsRoutes from "./appointments.routes";


const router = express.Router();

// Base routes
router.use("/", baseRoutes);

//API routes
//--------------
// users routes
router.use("/users", userRoutes);

//appointment routes
router.use("/appointments", appointmentsRoutes);

// auth routes
//router.use("/auth", authRoutes);

// webcreator routes
router.use("/webcreator", webcreatorRoutes);

export default router;
