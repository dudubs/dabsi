import { DataManager } from "../../../typerpc/data-manager/DataManager";
import { InputMap } from "../../../typerpc/input/input-map/InputMap";
import { InputErrorHook } from "../../../typerpc/input/InputErrorHook";
import { TextInput } from "../../../typerpc/input/text-input/TextInput";
import { RpcPartialConfig } from "../../../typerpc/RpcPartialConfig";
import { Form } from "../../../typerpc/widget/form/Form";

const NameInput = RpcPartialConfig(TextInput(), {
  minLength: 2,
  maxLength: 20,
  required: true,
});

const UserBasicInfoInput = InputMap({
  firstName: NameInput,
  lastName: NameInput,
  loginName: InputErrorHook<"ALREADY_EXISTS">()(TextInput()),
});

export const UserContactInfoInput = InputMap({
  phoneNumber: TextInput(),
  email: TextInput(),
});

export const AclUsersManager = DataManager({
  addInput: UserBasicInfoInput,
  editInput: InputMap({
    baseInfo: UserBasicInfoInput,
    contactInfo: UserContactInfoInput,
  }),
  tableRowType: {
    loginName: String,
    firstName: String,
    lastName: String,
  },
  editTabs: {
    // TODO: groups
  },
});
