import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import { DataSourceFactory2 } from "@dabsi/modules/DataSourceFactory2";
import ACL_AdminRpc, {
  ACL_GroupInput,
} from "@dabsi/system/acl/admin/common/rpc";
import { Group } from "@dabsi/system/acl/entities/Group";
import { Resolver } from "@dabsi/typedi";
import DataFormResolver, {
  DataFormResolver2,
} from "@dabsi/typerpc2/data-form/resolver";

const context = { getSource: DataSourceFactory2 } as const;
export default RpcResolver(ACL_AdminRpc, {
  groupsTable: Resolver(context, c => $ =>
    $({
      source: c.getSource(Group),
      columns: {
        groupName: { field: "name" },
        countUsers: { field: { $count: "users" } },
      },
    })
  ),
  addNewGroupForm: DataFormResolver2(Group, {}, c => $ =>
    $({
      debug(x) {
        x.groupNameasd;
        x.groupName;
      },
    })
  ),
});

// [{}, c=> $=>$({})]

// add... : {$withContext: $=> $({}, c => c)}
