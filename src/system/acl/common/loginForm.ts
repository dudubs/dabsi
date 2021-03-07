import { InputMap } from "@dabsi/typerpc/input/input-map/InputMap";
import { TextInput } from "@dabsi/typerpc/input/text-input/TextInput";
import { Form } from "@dabsi/typerpc/widget/form/rpc";

export const AclLoginForm = Form({
  input: InputMap({
    loginName: TextInput(),
    password: TextInput(),
  }),
});
