import { User } from "@dabsi/system/uac/entities/User";
import { DataRelation } from "@dabsi/typedata/relation";
import { Entity, ManyToOne } from "typeorm";

@Entity()
export class Friendship {
  @ManyToOne(() => User, { primary: true })
  owner!: DataRelation<User>;

  @ManyToOne(() => User, { primary: true })
  friend!: DataRelation<User>;
}

export default Friendship;
