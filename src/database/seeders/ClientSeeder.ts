import { SeederConfig } from "../../config/seeders";
import { getRandomValueFromArray } from "../../helpers/common";
import { Client } from "../../models/Client";
import { User } from "../../models/User";
import { ClientFactory } from "../factories /ClientFactory";
import { Seeder } from "./Seeder";

export class ClientSeeder extends Seeder {
  protected async generate(): Promise<void> {
    const { CLIENTS } = SeederConfig;

    const users = await User.find({
      where: {
        role: {
          id: 3,
        },
      },
    });
    const clients = new ClientFactory().createMany(CLIENTS);
    clients.forEach((client) => {
      client.user = getRandomValueFromArray(users);
    });
    await Client.save(clients);
  }
}