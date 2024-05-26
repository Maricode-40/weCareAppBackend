import { SeederConfig } from "../../config/seeders";
import { getRandomValueFromArray } from "../../helpers/common";
import { Appointment } from "../../models/Appointment";
import { Client } from "../../models/Client";
import { Webcreator } from "../../models/Webcreator";
import { AppointmentFactory } from "../factories /AppointmentFactory";
import { Seeder } from "./Seeder";

export class AppointmentSeeder extends Seeder {
  protected async generate(): Promise<void> {
    const { WEBCREATORS } = SeederConfig;
    const { CLIENTS } = SeederConfig;
    const { APPOINTMENTS } = SeederConfig;

    const webcreators = await Webcreator.find();
    const clients = await Client.find();

    const appointments = new AppointmentFactory().createMany(APPOINTMENTS);
    appointments.forEach((appointment) => {
      appointment.webcreator = getRandomValueFromArray(webcreators);
      appointment.client = getRandomValueFromArray(clients);
    });
    await Appointment.save(appointments);
  }
}