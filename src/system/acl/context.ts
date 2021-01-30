import { DataContext } from "@dabsi/modules/data/context";
import { Group } from "@dabsi/system/acl/entities/Group";
import { User } from "@dabsi/system/acl/entities/User";
import { DataSource } from "@dabsi/typedata/source";
import { Injectable } from "@dabsi/typedi";

@Injectable()
export class AclContext {
  constructor(protected data: DataContext) {}

  get groups(): DataSource<Group> {
    return this.data.getSource(Group);
  }

  get users(): DataSource<User> {
    return this.data.getSource(User);
  }
}
