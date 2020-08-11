import {ChildEntity} from "typeorm/index";
import {BaseAnimal} from "./BaseAnimal";

@ChildEntity()
export class Cat extends BaseAnimal {

}
