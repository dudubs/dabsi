import { checkUniqueName } from "../../../../system-old/server/acl/checkUniqueName";
import { RpcConfigResolver } from "../../../../typerpc/RpcConfigResolver";
import AclDataSources from "../../AclDataSources";
import { Group } from "./../../../../system-old/server/acl/Group";
import { DataRow } from "./../../../../typedata/DataRow";
import { AclGroupBasicInfoForm } from "./BasicInfoForm";

export const AclGroupBasicInfoConfig = RpcConfigResolver(
  AclGroupBasicInfoForm,
  {
    sources: AclDataSources,
    group: DataRow(Group),
  },
  c => $ =>
    $({
      inputConfig: {
        groupName: {
          $check: groupName =>
            checkUniqueName(c.sources.groups, "name", groupName, c.group.name),
        },
      },
      async submit({ groupName }) {
        await c.group.update({ name: groupName });
      },
    })
);
