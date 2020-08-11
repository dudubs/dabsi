
import {ChildEntity, ManyToOne} from "typeorm/index";
import {Relation} from "../../../../src/data/Relation";
import {Dog, DogBreed} from "./DogBreed";

@ChildEntity()
export class PurebredDog extends Dog {

    @ManyToOne(() => DogBreed, breed => breed.purebredDogs)
    breed: Relation<DogBreed>;
}
