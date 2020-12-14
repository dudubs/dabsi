import { InputMap } from "../../../../typerpc/input/input-map/InputMap";
import { TextInput } from "../../../../typerpc/input/text-input/TextInput";
import UniqueInput from "../../../../typerpc/input/UniqueInput";

export const AclGroupBasicInfoInput = InputMap({
  groupName: UniqueInput(TextInput()),
});
