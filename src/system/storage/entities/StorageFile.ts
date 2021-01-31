import { Session } from "@dabsi/modules/session/entities/Session";
import { Resource } from "@dabsi/modules/session/resource";
import { DataRelation } from "@dabsi/typedata/relation";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "storage/files" })
export class StorageFile extends Resource {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  url!: string;

  @ManyToOne(() => Session, { nullable: true })
  session!: DataRelation<Session>;
}
