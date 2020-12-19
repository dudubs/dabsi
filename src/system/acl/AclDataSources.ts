import { DataSources } from "@dabsi/typedata/DataSources";
import { Group } from "@dabsi/system/acl/entities/Group";
import { User } from "@dabsi/system/acl/entities/User";

export default DataSources({
  users: User,
  groups: Group,
});
