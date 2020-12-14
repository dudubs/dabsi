import { DataSources } from "../../typedata/DataSources";
import { Group } from "./../../system-old/server/acl/Group";
import { User } from "./../../system-old/server/acl/User";
export default DataSources({
  users: User,
  groups: Group,
});
