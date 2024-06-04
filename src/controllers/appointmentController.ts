import { Appointment } from "../models/Appointment";
import { Request, Response } from "express";
import { User } from "../models/User";
import { Client } from "../models/Client";

export const appointmentController = {
  async getAll(req: Request, res: Response) {
    try {
      console.log("getAll");

      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const [appointments, totalAppointments] = await Appointment.findAndCount({
        select: {
          id: true,
          dayDate: true,
          description: true,
          price: true,
        },
      });
      if (appointments.length === 0) {
        res.status(404).json({
          message: "Dates not found",
        });
        return;
      }

      const totalPages = Math.ceil(totalAppointments / limit);

      res.status(200).json({
        dates: appointments,
        current_page: page,
        per_page: limit,
        total_pages: totalPages,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  },
  //Get Appointments by ID
  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const appointment = await Appointment.findOne({
        relations: {
          webcreator: {
            user: true,
          },
          client: {
            user: true,
          },
        },
        select: {
          id: true,
          dayDate: true,
          description: true,
          price: true,
          webcreator: {
            id: true,
            user: {
              firstName: true,
              email: true,
            },
          },
          client: {
            id: true,
            user: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
        where: {
          id: id,
        },
      });
      if (!appointment) {
        res.status(404).json({ message: "Appointment not found" });
        return;
      }

      console.log(appointment);

      res.json(appointment);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  },

  //Create appointments

  async create(req: Request, res: Response): Promise<void> {
    ////console.log("Datos recibidos:", JSON.stringify(req.body, null, 2));

    try {
      const { day_date, price, description, webcreator_id, client_id } =
        req.body;

      if (!day_date || !price || !description || !webcreator_id || !client_id) {
        res.status(400).json({
          message: "All fields must be provided",
        });
        return;
      }

      const appointmentToCreate = Appointment.create({
        dayDate: day_date,
        price: price,
        description: description,
        webcreatorId: webcreator_id,
        clientId: client_id,
      });

      // Save to BD
      await Appointment.save(appointmentToCreate);

      res.status(201).json({
        message: "appointment has been created",
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to create date",
      });
    }
  },

  // DELETE APPOINTMENTS
  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const appointsdate = await Appointment.findOne({ where: { id: id } });
      if (!appointsdate) {
        res.status(404).json({ message: "Appointment date not found" });
        return;
      }
      await appointsdate.remove();
      res.json({ message: "Appointment deleted" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  },

  //Update Appointments
  async update(
    req: Request<{ id: string }, {}, Partial<Date>>,
    res: Response
  ): Promise<void> {
    try {
      const dateId = Number(req.params.id);
      const { ...resDatesData } = req.body;

      const appointmentToUpdate = await Appointment.findOne({
        where: { id: dateId },
      });
      if (!appointmentToUpdate) {
        res.status(404).json({ message: "appointment not found" });
        return;
      }
      console.log(appointmentToUpdate);

      const updatedDate: Partial<Date> = {
        ...appointmentToUpdate,
        ...resDatesData,
      };

      await Appointment.save(appointmentToUpdate);

      res.status(202).json({
        message: "Appointment has been updated",
      });
    } catch (error) {
      res.status(500).json({
        message: "Appointment not found",
      });
    }
  },
};
