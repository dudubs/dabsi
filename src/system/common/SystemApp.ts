import { Payload, TypeRef, Typing } from "../../common/typings";
import { DataInput } from "../../typerpc/input/data-input/DataInput";
import { RpcFn } from "../../typerpc/rpc-fn/RpcFn";
import { RpcMap } from "../../typerpc/rpc-map/RpcMap";
import { Form } from "../../typerpc/widget/form/Form";
import { AdminApp } from "./AdminApp";
import { UserApp } from "./UserApp";

export declare const DevLoginUser: unique symbol;

export const DevLogin = Form({
  input: DataInput({
    loadType: TypeRef(() => DevLoginUser),
  }),
  value: Typing<{ helloTo: string }>(),
});

export const SystemApp = RpcMap({
  logout: RpcFn(),

  getLoginInfo: RpcFn<
    () => Payload<{
      FAILED: {};
      SUCCESS: {
        fullName: string;
        isAdmin: boolean;
      };
    }>
  >(),

  devLogin: DevLogin,

  admin: AdminApp,

  user: UserApp,
});
