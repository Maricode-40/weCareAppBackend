import express, { Request, Response } from "express";

const router = express.Router();

//base route
router.get("/", (req: Request, res: Response) => {
  res.send(
    "Welcome to REST API for Appointment Management  in  ONGWECARE4U ...."
  );
});

export default router;
