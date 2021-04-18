import { Session } from "@dabsi/modules/session/entities/Session";
import { BaseResource } from "@dabsi/modules/session/resource";
import { DataRelation } from "@dabsi/typedata/relation";
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from "typeorm";

@Entity({ name: "storage/files" })
@TableInheritance({ column: "type" })
export class StorageFile extends BaseResource {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type!: string;

  @Column()
  url!: string;

  @ManyToOne(() => Session, { nullable: true })
  session!: DataRelation<Session>;
}
