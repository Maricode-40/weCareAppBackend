import { SeederConfig } from "../../config/seeders";
import { getRandomValueFromArray } from "../../helpers/common";
import { User } from "../../models/User";
import { Webcreator } from "../../models/Webcreator";
import { WebcreatorFactory } from "../factories /WebcreatorFactory";
import { Seeder } from "./Seeder";

export class WebcreatorSeeder extends Seeder {
  protected async generate(): Promise<void> {
    const { WEBCREATORS } = SeederConfig;

    const users = await User.find({
      where: {
        role: {
          id: 2,
        },
      },
    });
    const webcreators = new WebcreatorFactory().createMany(WEBCREATORS);
    webcreators.forEach((webcreator) => {
      webcreator.user = getRandomValueFromArray(users);
    })
    await Webcreator.save(webcreators);
  }
}
