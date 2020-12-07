import { InputErrorHook } from "./../../../typerpc/input/InputErrorHook";

import { TextInput } from "./../../../typerpc/input/text-input/TextInput";
import { InputMap } from "./../../../typerpc/input/input-map/InputMap";
import { BoolInput } from "../../../typerpc/input/bool-input/BoolInput";
import { DataInputMap } from "../../../typerpc/input/data-input-map/DataInputMap";
import { RpcMap } from "../../../typerpc/rpc-map/RpcMap";
import { RpcParameter } from "../../../typerpc/rpc-parameter/RpcParameter";
import { DataTable } from "../../../typerpc/widget/data-table/DataTable";
import { Form } from "../../../typerpc/widget/form/Form";
import { WidgetMap } from "../../../typerpc/widget/widget-map/WidgetMap";
import { UserBasicInfoInput } from "../../acl/common/UserBasicInfoInput";
import { UserContactInfoInput } from "../../acl/common/UserContactInfoInput";
import { AdminRpc } from "../../admin/common";

export const AclEditUserWidget = WidgetMap({
  basicInfo: Form({
    input: UserBasicInfoInput,
  }),
  contactInfo: Form({
    input: UserContactInfoInput,
  }),
  groups: Form({
    input: DataInputMap(BoolInput()),
  }),
});

export const AclAddNewGroupForm = Form({
  input: InputMap({
    groupName: InputErrorHook<"ALREADY_EXISTS">()(TextInput()),
  }),
});

export const AclGroupsWidget = DataTable({
  groupName: String,
});

export const [AclAdminRpc, AclAdminConnection] = AdminRpc.register(
  "acl",
  RpcMap({
    editUser: RpcParameter(String, AclEditUserWidget),
    groups: AclGroupsWidget,
    addNewGroup: AclAddNewGroupForm,
  })
);
