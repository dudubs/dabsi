import { ChildEntity, JoinTable, ManyToMany } from "typeorm/index";
import { DataRelation } from "../../../../src/typedata/DataRelation";
import { Dog, DogBreed } from "./DogBreed";

@ChildEntity()
export class MixedDog extends Dog {
  @JoinTable()
  @ManyToMany(() => DogBreed, breed => breed.mixedDogs)
  breeds: DataRelation<DogBreed>[];
}
