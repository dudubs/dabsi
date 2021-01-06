import { Group } from "./entities/Group";
import { User } from "@dabsi/system/acl/entities/User";
import DataSourceResolver from "../../modules/data/DataSourceResolver";

export default DataSourceResolver({
  users: User,
  groups: Group,
});
