import { Payload } from "@dabsi/common/typings2/Payload";
import { type } from "@dabsi/common/typings2/Typing";
import SystemRpc from "@dabsi/system/core/common/rpc";
import { Rpc, RpcContextual, RpcFuncational } from "@dabsi/typerpc2";
import { Form } from "@dabsi/typerpc2/form/rpc";
import { ObjectInput } from "@dabsi/typerpc2/object-input/rpc";
import { TextInput } from "@dabsi/typerpc2/text-input/rpc";

export type AclStats = Payload<{
  guest: {};
  user: { loginName: string; fullName?: string };
}>;

export class AclLoginForm extends Form(
  ObjectInput({
    loginName: TextInput,
    password: TextInput,
  }),
  //
  type as Payload<{
    failed: {};
    success: { fullName?: string };
  }>
) {}

export class AclRpc extends Rpc {
  static instance = SystemRpc.register("acl", AclRpc);

  @RpcContextual(() => AclLoginForm) login!: AclLoginForm;

  @RpcFuncational() getStats!: () => Promise<AclStats>;
}
