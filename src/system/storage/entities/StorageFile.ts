import { Session } from "@dabsi/modules/session/entities/Session";
import { DataRelation } from "@dabsi/typedata/relation";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "storage/files" })
export class StorageFile {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  url!: string;

  @ManyToOne(() => Session, { nullable: true })
  session!: DataRelation<Session>;
}
