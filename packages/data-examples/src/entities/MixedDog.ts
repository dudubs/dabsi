
import {ChildEntity, JoinTable, ManyToMany} from "typeorm/index";
import {Relation} from "../../../../src/data/Relation";
import {Dog, DogBreed} from "./DogBreed";

@ChildEntity()
export class MixedDog extends Dog {

    @JoinTable()
    @ManyToMany(() => DogBreed, breed => breed.mixedDogs)
    breeds: Relation<DogBreed>[];
}
