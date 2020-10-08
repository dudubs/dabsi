import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { DataSelector } from "../data/DataSelector";

@Entity({ name: "user" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  loginName?: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  phoneNumber?: string;
}

export class User extends DataSelector(UserEntity, {
  fields: {
    fullName: { $join: [["firstName", "lastName"], " "] },
  },
} as const) {
  fullName: string;
}
