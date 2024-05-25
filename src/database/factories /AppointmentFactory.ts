import { Appointment } from "../../models/Appointment";
import { faker } from "@faker-js/faker";
import { Factory } from "./Factory";


export class AppointmentFactory extends Factory <Appointment> {
    protected generate(): Appointment{
        return {
          dayDate: faker.date.future(),
          webcreatorId: faker.number.int(),
          clientId: faker.number.int(),
          description: faker.lorem.sentence(),
          price: faker.number.int({ min: 1000, max: 10000 }),
        } as Appointment;
    }
}