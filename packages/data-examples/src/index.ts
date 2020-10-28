import { Connection, createConnection } from "typeorm/index";
import { defined } from "../../../src/common/object/defined";
import { EntityDataSource } from "../../../src/data/eds/EntityDataSource";
import { Animal } from "./Animal";
import { BaseAnimal } from "./entities/BaseAnimal";
import { Cat } from "./entities/Cat";
import { Dog, DogBreed } from "./entities/DogBreed";
import { MixedDog } from "./entities/MixedDog";
import { PurebredDog } from "./entities/PurebredDog";

let connection: Connection;

function getConnection() {
  return defined(connection, () => `No connection`);
}

const Animals = EntityDataSource.create(Animal, getConnection);
const DogBreeds = EntityDataSource.create(DogBreed, getConnection);

const MixedDogs = Animals.as("mixedDog");
const PurebredDogs = Animals.as("purebredDog");
const Cats = Animals.as("cat");

(async () => {
  connection = await createConnection({
    type: "sqlite",
    synchronize: true,
    database: ":memory:",
    entities: [BaseAnimal, Dog, Cat, DogBreed, Dog, PurebredDog, MixedDog],
  });

  const dogBreedsKeys = {
    husky: await DogBreeds.insertKey({ name: "Siberian Husky" }),

    doberman: await DogBreeds.insertKey({ name: "doberman" }),
  };

  const PurebredDogsOfHusky = PurebredDogs.of("breed", dogBreedsKeys.husky);

  const dogKeys = {
    ralf: await MixedDogs.insertKey({
      name: "Ralf",
    }),

    ski: await PurebredDogsOfHusky.insertKey({
      name: "Ski",
    }),

    tyson: await MixedDogs.insertKey({
      name: "Tyson",
    }),
  };

  // From dog to breed

  // save({})

  const huskeyDogs = await Animals.filter({
    $or: [
      {
        $as: { purebredDog: { $at: { breed: { $is: dogBreedsKeys.husky } } } },
      },
      { $as: { mixedDog: { $has: { breeds: { $is: dogBreedsKeys.husky } } } } },
    ],
  }).getRows();
})();
