import { RoleSeeder } from "./RoleSeeder";
import { UserSeeder } from "./UserSeeder";
import { ClientSeeder } from "./ClientSeeder";
import { WebcreatorSeeder } from "./WebcreatorSeeder";
import { AppointmentSeeder } from "./AppointmentSeeder";

(async () => {
  console.log("starting seeding");

  await new RoleSeeder().start();
  await new UserSeeder().start();
  await new WebcreatorSeeder().start();
  await new ClientSeeder().start();
  await new AppointmentSeeder().start();
})();
