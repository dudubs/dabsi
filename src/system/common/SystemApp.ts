import { Payload } from "../../common/typings2/Payload";
import { TypeRef } from "../../common/typings2/TypeRef";
import { Typing } from "../../common/typings2/Typing";
import { DataInput } from "../../typerpc/input/data-input/DataInput";
import { RpcFn } from "../../typerpc/rpc-fn/RpcFn";
import { RpcMap } from "../../typerpc/rpc-map/RpcMap";
import { Form } from "../../typerpc/widget/form/Form";
import { AdminApp } from "./AdminApp";
import { UserApp } from "./UserApp";

export declare const DevLoginUser: unique symbol;

export type LoginInfo = Payload<{
  FAILED: {};
  SUCCESS: {
    fullName: string;
    isAdmin: boolean;
  };
}>;

// RemotePromise<X>
// type: rejected
// type: resolved

export const DevLogin = Form({
  input: DataInput({
    loadType: TypeRef(() => DevLoginUser),
  }),
  value: Typing<LoginInfo>(),
});

export const SystemApp = RpcMap({
  logout: RpcFn(),

  getLoginInfo: RpcFn<() => LoginInfo>(),

  devLogin: DevLogin,

  admin: AdminApp,

  user: UserApp,
});
