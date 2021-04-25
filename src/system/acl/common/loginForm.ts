import { InputMap } from "@dabsi/old-typerpc/input/input-map/InputMap";
import { TextInput } from "@dabsi/old-typerpc/input/text-input/TextInput";
import { Form } from "@dabsi/old-typerpc/widget/form/rpc";

export const AclLoginForm = Form({
  input: InputMap({
    loginName: TextInput(),
    password: TextInput(),
  }),
});
