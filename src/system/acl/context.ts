import { DataSourceFactory2 } from "@dabsi/modules/DbModule";
import { Group } from "@dabsi/system/acl/entities/Group";
import { User } from "@dabsi/system/acl/entities/User";
import { Resolver } from "@dabsi/typedi";

export default class AclContext extends Resolver(
  [DataSourceFactory2],
  getDataSource => ({
    users: getDataSource(User),
    groups: getDataSource(Group),
  })
) {}
