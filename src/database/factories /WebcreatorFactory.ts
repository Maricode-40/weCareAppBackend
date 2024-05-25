import { Webcreator } from "../../models/Webcreator";
import { faker } from "@faker-js/faker";
import { Factory } from "./Factory";

export class WebcreatorFactory extends Factory<Webcreator> {
  protected generate(): Webcreator {
    return {
      style: faker.helpers.arrayElement([
        "webdesigner",
        "webdeveloper",
        "webmanager",
        "webmobile",
      ]),
      area: faker.location.city(),
    } as Webcreator;
  }
}
