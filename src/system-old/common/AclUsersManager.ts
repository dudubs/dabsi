import { DataManager } from "../../typerpc/data-manager/DataManager";

import { DataManagerRouter } from "../../typerpc/data-manager/DataManagerRouter";
import { BoolInput } from "../../typerpc/input/bool-input/BoolInput";
import { DataInputMap } from "../../typerpc/input/data-input-map/DataInputMap";
import { InputMap } from "../../typerpc/input/input-map/InputMap";
import { InputErrorHook } from "../../typerpc/input/InputErrorHook";
import { TextInput } from "../../typerpc/input/text-input/TextInput";
import { Form } from "../../typerpc/widget/form/Form";
import { NameInput } from "./NameInput";

/*

InputWithError<>()

// check

InputWithErrorViewProps()
InlineInput({
  target: TextInput()
  error: Typing<...>(),

})

// InlineInputError
// InlineWidgetElemtn

 */

export const UserBasicInfoInput = InputMap({
  firstName: NameInput,
  lastName: NameInput,
  loginName: InputErrorHook<"ALREADY_EXISTS">()(
    TextInput({
      nullable: true,
      trim: true,
    })
  ),
});

/*

const currentTabState = useRouterLocationState(location, "currentTab");



// emit(new LocationState("x", "asdad"))

<Tabs view currentTabState={()=> useRouterLocationState(location, "currentTab")} />
 */
export const UserContactInfoInput = InputMap({
  phoneNumber: TextInput({ nullable: true, trim: true }),
  email: TextInput({ nullable: true, trim: true }),
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

  // editController
  // defaultParam
  editTabs: {
    // TODO: groups
    groups: Form({
      input: DataInputMap(BoolInput()),
    }),
  },
});

export const AclUsersManagerRouter = DataManagerRouter(AclUsersManager);
