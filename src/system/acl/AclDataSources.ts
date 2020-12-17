import { DataSources } from "@dabsi/typedata/DataSources";
import { Group } from "@dabsi/system-old/server/acl/Group";
import { User } from "@dabsi/system-old/server/acl/User";

export default DataSources({
  users: User,
  groups: Group,
});
