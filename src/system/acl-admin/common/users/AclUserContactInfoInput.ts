import { InputMap } from "../../../typerpc/input/input-map/InputMap";
import { TextInput } from "../../../typerpc/input/text-input/TextInput";

export default InputMap({
  phoneNumber: TextInput({ nullable: true, trim: true }),
  email: TextInput({ nullable: true, trim: true }),
});
