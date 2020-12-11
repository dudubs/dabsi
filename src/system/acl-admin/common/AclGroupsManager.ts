import { Form } from "./../../../typerpc/widget/form/Form";
import { WidgetMap } from "./../../../typerpc/widget/widget-map/WidgetMap";
import UniqueInput from "../../../typerpc/input/UniqueInput";
import { DataManager2 } from "./../../../typerpc/data-manager/DataManager2";
import { InputMap } from "./../../../typerpc/input/input-map/InputMap";
import { TextInput } from "./../../../typerpc/input/text-input/TextInput";

export const GroupBasicInfoInput = InputMap({
  groupName: UniqueInput(TextInput()),
});

export default DataManager2({
  tableRowType: {
    groupName: String,
  },
  addInput: GroupBasicInfoInput,
  edit: WidgetMap({
    basicInfo: Form({
      input: GroupBasicInfoInput,
    }),
  }),
});
