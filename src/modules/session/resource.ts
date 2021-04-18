import { Session } from "@dabsi/modules/session/entities/Session";
import { DataRelation } from "@dabsi/typedata/relation";
import { Column, ManyToOne } from "typeorm";

export class BaseResource {
  @ManyToOne(() => Session, { nullable: true, onDelete: "SET NULL" })
  session!: DataRelation<Session>;

  @Column({ default: false })
  wasErrorOnDelete!: boolean;
}
