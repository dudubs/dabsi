import { Router } from "../../../typerouter/Router";
import { InputMap } from "../../../typerpc/input/input-map/InputMap";
import { TextInput } from "../../../typerpc/input/text-input/TextInput";
import { RpcFn } from "../../../typerpc/rpc-fn/RpcFn";
import { RpcMap } from "../../../typerpc/rpc-map/RpcMap";
import { Form } from "../../../typerpc/widget/form/Form";
import { SystemRouter } from "../../core/common/SystemRouter";
import { SystemRpc } from "../../core/common/SystemRpc";

export type LoginInfoData =
  | {
      type: "success";
      fullName: string;
    }
  | { type: "fail" };

export const AclLoginForm = Form({
  input: InputMap({
    loginName: TextInput(),
    password: TextInput(),
  }),
});

export const AclLoginRouter = Router();

SystemRouter.register("login", AclLoginRouter);

export const AclRpc = RpcMap({
  login: AclLoginForm,
  getLoginInfo: RpcFn<() => LoginInfoData>(),
});
//
export const AclConnection = SystemRpc.register("acl", AclRpc);

// AdminRpcConfigResolver(AclRpc, { token: "" }, )

// Admin
