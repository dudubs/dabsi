import { InputMap } from "@dabsi/typerpc/input/input-map/InputMap";
import { InputErrorHook } from "@dabsi/typerpc/input/InputErrorHook";
import { TextInput } from "@dabsi/typerpc/input/text-input/TextInput";
import { NameInput } from "@dabsi/system-old/common/NameInput";

export const AclAdminUserBasicInfoInput = InputMap({
  firstName: NameInput,
  lastName: NameInput,
  loginName: InputErrorHook<"ALREADY_EXISTS">()(
    TextInput({
      nullable: true,
      trim: true,
    })
  ),
});
