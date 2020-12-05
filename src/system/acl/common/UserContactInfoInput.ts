import { InputMap } from "../../../typerpc/input/input-map/InputMap";
import { TextInput } from "../../../typerpc/input/text-input/TextInput";

export const UserContactInfoInput = InputMap({
  phoneNumber: TextInput({ nullable: true, trim: true }),
  email: TextInput({ nullable: true, trim: true }),
});
