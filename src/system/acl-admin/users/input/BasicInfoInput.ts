import { InputMap } from "../../../../typerpc/input/input-map/InputMap";
import { InputErrorHook } from "../../../../typerpc/input/InputErrorHook";
import { TextInput } from "../../../../typerpc/input/text-input/TextInput";
import { NameInput } from "../../../../system-old/common/NameInput";

export const AclUserBasicInfoInput = InputMap({
  firstName: NameInput,
  lastName: NameInput,
  loginName: InputErrorHook<"ALREADY_EXISTS">()(
    TextInput({
      nullable: true,
      trim: true,
    })
  ),
});
