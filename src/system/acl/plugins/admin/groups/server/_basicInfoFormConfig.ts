import { RpcConfigResolver } from "@dabsi/modules/rpc/configResolver";
import { AclContext } from "@dabsi/system/acl/context";
import { Group } from "@dabsi/system/acl/entities/Group";
import { AclAdminGroupBasicInfoForm } from "@dabsi/system/acl/plugins/admin/groups/common/basicInfoForm";
import { DataRow } from "@dabsi/typedata/row";
import RpcConfigFactoryResolver from "../../../../../../modules/rpc/configFactoryResolver";

export default RpcConfigResolver(
  AclAdminGroupBasicInfoForm,
  {
    sources: AclContext,
    createInputConfig: RpcConfigFactoryResolver(
      AclAdminGroupBasicInfoForm.at("input")
    ),
    group: DataRow(Group),
  },
  c => $ =>
    $({
      valueConfig: {
        groupName: c.group.name,
      },
      inputConfig: c.createInputConfig(),
      async submit({ groupName }) {
        await c.group.update({ name: groupName });
      },
    })
);
