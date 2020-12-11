import { checkUniqueName } from "../../../system-old/server/acl/checkUniqueName";
import { Group } from "../../../system-old/server/acl/Group";
import { DataSources } from "../../../typedata/DataSources";
import { RpcConfigResolver } from "../../../typerpc/RpcConfigResolver";
import AclGroupsManager from "../common/AclGroupsManager";

export default RpcConfigResolver(
  AclGroupsManager,
  {
    sources: DataSources({ groups: Group }),
  },
  c => $ =>
    $({
      addInputConfig: {
        groupName: {
          $check: groupName =>
            checkUniqueName(c.sources.groups, "name", groupName),
        },
      },
      tableColumns: {
        groupName: "name",
      },
      source: c.sources.groups,
      editConfigFactory: ($, row) =>
        $({
          basicInfo: {
            inputConfig: {
              groupName: {
                $check: groupName =>
                  checkUniqueName(
                    c.sources.groups,
                    "name",
                    groupName,
                    row.name
                  ),
              },
            },
            valueConfig: {
              groupName: row.name,
            },
            async submit({ groupName }) {
              await row.update({ name: groupName });
            },
          },
        }),
      addSubmit({ groupName }) {
        return c.sources.groups.insertKey({ name: groupName });
      },
    })
);
