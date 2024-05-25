import { Role } from "../../models/Role";
import { Seeder } from "./Seeder";
import { UserRoles } from "../../constants/UserRoles";

export class RoleSeeder extends Seeder {
  protected async generate(): Promise<void> {
    const roles: Partial<Role>[] = [
      UserRoles.SUPERADMIN,
      UserRoles.WEBCREATOR,
      UserRoles.CLIENT,
    ];
    await Role.save(roles);
  }
}