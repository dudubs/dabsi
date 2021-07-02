import { Payload } from "@dabsi/common/typings2/Payload";
import { type } from "@dabsi/common/typings2/Typing";
import { AclCurrentUser } from "@dabsi/system/acl/common/AclCurrentUser";
import { Form } from "@dabsi/typerpc/form/rpc";
import { ObjectInput } from "@dabsi/typerpc/object-input/rpc";
import { TextInput } from "@dabsi/typerpc/text-input/rpc";

export class AclLoginForm extends Form(
  ObjectInput({
    loginName: TextInput,
    password: TextInput,
  }),
  //
  type as Payload<{
    failed: {};
    success: { user: AclCurrentUser };
  }>
) {}
