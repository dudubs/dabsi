import Session from "@dabsi/modules/session/entities/Session";
import { DataRelation } from "@dabsi/typedata/DataRelation";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "storage/files" })
export class StorageFile {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  countRefs!: number;

  @Column()
  url!: string;

  // TODO: Session?
  @Column()
  time!: number;

  @ManyToOne(() => Session, { nullable: true })
  session!: DataRelation<Session>;
}
