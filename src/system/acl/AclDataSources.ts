import DataSources from "@dabsi/typedata/DataSources";
import { Group } from "@dabsi/system/acl/entities/Group";
import { User } from "@dabsi/system/acl/entities/User";

export default class extends DataSources({
  users: User,
  groups: Group,
}) {}
