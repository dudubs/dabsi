import { DataSourceFactory2 } from "@dabsi/modules/DbModule";
import { Group } from "@dabsi/system/uac/entities/Group";
import { User } from "@dabsi/system/uac/entities/User";
import { Resolver } from "@dabsi/typedi";

export default class UacContext extends Resolver(
  [DataSourceFactory2],
  getDataSource => ({
    users: getDataSource(User),
    groups: getDataSource(Group),
  })
) {}
