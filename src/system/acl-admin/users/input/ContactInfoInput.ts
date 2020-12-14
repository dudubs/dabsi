import { InputMap } from "../../../../typerpc/input/input-map/InputMap";
import { TextInput } from "../../../../typerpc/input/text-input/TextInput";

export const AclUserContactInfoInput = InputMap({
  phoneNumber: TextInput({ nullable: true, trim: true }),

  // TODO: Unique, also builtin- unique error
  email: TextInput({ nullable: true, trim: true }),
});
