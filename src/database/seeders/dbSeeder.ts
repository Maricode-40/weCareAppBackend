import { RoleSeeder } from "./RoleSeeder";
import { UserSeeder } from "./UserSeeder";

(async () => {
  console.log("starting seeding");

  await new RoleSeeder().start();
  await new UserSeeder().start();
})();
