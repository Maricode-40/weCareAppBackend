import { Seeder } from "./Seeder";
import { UserRoles } from "../../constants/UserRoles";
import { SeederConfig } from "../../config/seeders";
import { UserFactory } from "../factories /UserFactory";
import { User } from "../../models/User";

export class UserSeeder extends Seeder {
  protected async generate(): Promise<void> {
    const { SUPERADMINS, WEBCREATORS, CLIENTS } = SeederConfig;

    const userFactory = new UserFactory();

    const superAdminUsers = userFactory.createMany(SUPERADMINS);
    superAdminUsers.forEach((user, i) => {
      user.role = UserRoles.SUPERADMIN;
      user.email = `superadmin${i + 1}@superadmin.com`;
    });
    const webCreatorUsers = userFactory.createMany(WEBCREATORS);
    webCreatorUsers.forEach((user, i) => {
        user.role = UserRoles.WEBCREATOR;
        user.email = `webcreator${i + 1}@creator.com`;
    }); 

    const clientUsers = userFactory.createMany(CLIENTS);
    clientUsers.forEach((user) => {
        user.role = UserRoles.CLIENT;
    }); 
    const allUsers = [...superAdminUsers, ...webCreatorUsers, ...clientUsers];
    await User.save(allUsers)
  }
}
