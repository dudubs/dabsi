import {DataUnion} from "../../../src/data/DataUnion";
import {BaseAnimal} from "./entities/BaseAnimal";
import {Cat} from "./entities/Cat";
import {Dog} from "./entities/DogBreed";
import {MixedDog} from "./entities/MixedDog";
import {PurebredDog} from "./entities/PurebredDog";

export class Animal extends DataUnion(BaseAnimal, {
    children: {
        cat: Cat,
        mixedDog: MixedDog,
        purebredDog: PurebredDog
    }
}) {

}
