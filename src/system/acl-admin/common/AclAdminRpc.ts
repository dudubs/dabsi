import { BoolInput } from "../../../typerpc/input/bool-input/BoolInput";
import { DataInputMap } from "../../../typerpc/input/data-input-map/DataInputMap";
import { RpcMap } from "../../../typerpc/rpc-map/RpcMap";
import { RpcParameter } from "../../../typerpc/rpc-parameter/RpcParameter";
import { WidgetMap } from "../../../typerpc/widget/widget-map/WidgetMap";
import { AdminRpc } from "../../admin/common";
import { Form } from "./../../../typerpc/widget/form/Form";
import { WidgetNamespace } from "./../../../typerpc/widget/widget-namespace/WidgetNamspace";
import { UserBasicInfoInput } from "./../../acl/common/UserBasicInfoInput";
import { UserContactInfoInput } from "./../../acl/common/UserContactInfoInput";
import AclGroupsManager from "./AclGroupsManager";

export const AclEditUser = WidgetNamespace();

export const [
  AclEditBasicUserInfo,
  AclEditBasicUserInfoConn,
] = AclEditUser.register(
  "basicInfo",
  Form({
    input: UserBasicInfoInput,
  })
);

export const [
  AclEditUserContactInfo,
  AclEditUserContactInfoConn,
] = AclEditUser.register(
  "contactInfo",
  Form({
    input: UserContactInfoInput,
  })
);

export const [
  AclEditUserGroups, //
  AclEditUserGroupsConn,
] = AclEditUser.register(
  "groups",
  Form({
    input: DataInputMap(BoolInput()),
  })
);

export const [AclAdminRpc, AclAdminConnection] = AdminRpc.register(
  "acl",
  RpcMap({
    editUser: RpcParameter(String, AclEditUser),
    groupsManager: AclGroupsManager,
  })
);
