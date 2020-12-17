import { DataManager } from "@dabsi/typerpc/data-manager";
import { Form } from "@dabsi/typerpc/widget/form/Form";
import { WidgetMap } from "@dabsi/typerpc/widget/widget-map/WidgetMap";
import AclEditGroup from "@dabsi/system/acl-admin/groups/AclEditGroup";
import { AclGroupBasicInfoInput } from "@dabsi/system/acl-admin/groups/input/BasicInfoInput";

export default DataManager({
  tableRowType: {
    groupName: String,
  },
  addInput: AclGroupBasicInfoInput,
  edit: AclEditGroup,
});
