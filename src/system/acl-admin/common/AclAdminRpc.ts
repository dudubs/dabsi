import { RpcMap } from "../../../typerpc/rpc-map/RpcMap";
import { RpcParameter } from "../../../typerpc/rpc-parameter/RpcParameter";
import { Form } from "../../../typerpc/widget/form/Form";
import { WidgetMap } from "../../../typerpc/widget/widget-map/WidgetMap";
import { UserBasicInfoInput } from "../../acl/common/UserBasicInfoInput";
import { UserContactInfoInput } from "../../acl/common/UserContactInfoInput";
import { AdminRpc } from "../../admin/common";

export const [AclAdminRpc, AclAdminConnection] = AdminRpc.register(
  "acl",
  RpcMap({
    editUser: RpcParameter(
      String,
      WidgetMap({
        basicInfo: Form({
          input: UserBasicInfoInput,
        }),
        contactInfo: Form({
          input: UserContactInfoInput,
        }),
      })
    ),
  })
);
//const [rpc, []] AclAdminRpc.register("acl",
