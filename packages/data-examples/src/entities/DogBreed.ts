import {
  ChildEntity,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm/index";
import { DataRelation } from "../../../../src/typedata/DataRelation";
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
  purebredDogs: DataRelation<PurebredDog>[];

  @ManyToMany(() => MixedDog, dog => dog.breeds)
  mixedDogs: DataRelation<MixedDog>[];
}

@ChildEntity()
export class Dog extends BaseAnimal {}
