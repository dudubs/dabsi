import { InputMap } from "@dabsi/typerpc/input/input-map/InputMap";
import { TextInput } from "@dabsi/typerpc/input/text-input/TextInput";
import UniqueInput from "@dabsi/typerpc/input/UniqueInput";

export default InputMap({
  groupName: UniqueInput(TextInput()),
});
