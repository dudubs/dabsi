import { Group } from "../../../system-old/server/acl/Group";
import { DataSources } from "../../../typedata/DataSources";
import { RpcConfigResolver } from "../../../typerpc/RpcConfigResolver";
import { AclAdminRpc } from "../common/AclAdminRpc";
import { AclEditUserConfig } from "./AclEditUserConfig";

export const AclAdminRpcConfig = RpcConfigResolver(
  AclAdminRpc,
  {
    editUserConfig: AclEditUserConfig,
    sources: DataSources({ groups: Group }),
  },
  c => $ =>
    $({
      editUser: c.editUserConfig,
      groups: $ =>
        $({
          source: c.sources.groups,
          columns: {
            groupName: "name",
          },
        }),
      addNewGroup: {
        inputConfig: {},
        submit: async ({ groupName }) => {
          await c.sources.groups.insert({ name: groupName });
        },
      },
    })
);
