import { DataSources } from "@dabsi/typedata/DataSources";
import { Group } from "@dabsi/system/acl/entities/AclGroup";
import { User } from "@dabsi/system/acl/entities/AclUser";

export default DataSources({
  users: User,
  groups: Group,
});
