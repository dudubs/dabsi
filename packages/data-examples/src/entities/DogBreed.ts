import {
  ChildEntity,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm/index";
import { Relation } from "../../../../src/typedata/Relation";
import { BaseAnimal } from "./BaseAnimal";
import { MixedDog } from "./MixedDog";
import { PurebredDog } from "./PurebredDog";

@Entity()
export class DogBreed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => PurebredDog, dog => dog.breed)
  purebredDogs: Relation<PurebredDog>[];

  @ManyToMany(() => MixedDog, dog => dog.breeds)
  mixedDogs: Relation<MixedDog>[];
}

@ChildEntity()
export class Dog extends BaseAnimal {}
