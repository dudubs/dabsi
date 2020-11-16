import { DataManager } from "../../typerpc/data-manager/DataManager";

import { DataManagerRouter } from "../../typerpc/data-manager/DataManagerRouter";
import { InputMap } from "../../typerpc/input/input-map/InputMap";
import { InputErrorHook } from "../../typerpc/input/InputErrorHook";
import { TextInput } from "../../typerpc/input/text-input/TextInput";
import { RpcPartialConfig } from "../../typerpc/RpcPartialConfig";

const NameInput = RpcPartialConfig(TextInput(), {
  minLength: 2,
  maxLength: 20,
  required: true,
});

export const UserBasicInfoInput = InputMap({
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
    basicInfo: UserBasicInfoInput,
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

export const AclUsersManagerRouter = DataManagerRouter(AclUsersManager);
