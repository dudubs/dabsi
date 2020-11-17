import { ChildEntity, ManyToOne } from "typeorm/index";
import { DataRelation } from "../../../../src/typedata/DataRelation";
import { Dog, DogBreed } from "./DogBreed";

@ChildEntity()
export class PurebredDog extends Dog {
  @ManyToOne(() => DogBreed, breed => breed.purebredDogs)
  breed: DataRelation<DogBreed>;
}
