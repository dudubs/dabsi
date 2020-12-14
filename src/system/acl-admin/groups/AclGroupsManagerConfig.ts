import { checkUniqueName } from "../../../system-old/server/acl/checkUniqueName";
import { Group } from "../../../system-old/server/acl/Group";
import { RpcConfigResolver } from "../../../typerpc/RpcConfigResolver";
import { SystemModule } from "../../core/SystemModule";
import SystemRpcConfigResolver from "../../core/SystemRpcConfigResolver";
import AclDataSources from "../AclDataSources";
import AclGroupsManager from "./AclGroupsManager";

export default RpcConfigResolver(
  AclGroupsManager,
  {
    getRpcConfig: SystemRpcConfigResolver(),
    sources: AclDataSources,
  },
  c => $ =>
    $({
      source: c.sources.groups,
      tableColumns: {
        groupName: "name",
      },
      editConfigFactory: ($, group) =>
        $({
          getNamespaceConfig(rpc) {
            return c.getRpcConfig(
              rpc,
              Group.provide(() => group)
            );
          },
        }),
      addInputConfig: {
        groupName: {
          $check: groupName =>
            checkUniqueName(c.sources.groups, "name", groupName),
        },
      },
      addSubmit({ groupName }) {
        return c.sources.groups.insertKey({ name: groupName });
      },
    })
);
