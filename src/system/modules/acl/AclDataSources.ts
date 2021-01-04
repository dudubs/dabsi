import { Group } from "@dabsi/system/modules/acl/entities/Group";
import { User } from "@dabsi/system/modules/acl/entities/User";
import DataSourceResolver from "../../../modules/data/DataSourceResolver";

export default DataSourceResolver({
  users: User,
  groups: Group,
});
