import { DataManager } from "../../../typerpc/data-manager";
import { Form } from "../../../typerpc/widget/form/Form";
import { WidgetMap } from "../../../typerpc/widget/widget-map/WidgetMap";
import AclEditGroup from "./AclEditGroup";
import { AclGroupBasicInfoInput } from "./input/BasicInfoInput";

export default DataManager({
  tableRowType: {
    groupName: String,
  },
  addInput: AclGroupBasicInfoInput,
  edit: AclEditGroup,
});
