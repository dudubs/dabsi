import { UserContactInfoInput } from "./../../acl/common/UserContactInfoInput";
import { DataManager } from "../../../typerpc/data-manager";
import { Form } from "./../../../typerpc/widget/form/Form";
import { WidgetMap } from "./../../../typerpc/widget/widget-map/WidgetMap";
import { UserBasicInfoInput } from "./../../acl/common/UserBasicInfoInput";

export default DataManager({
  tableRowType: {
    firstName: String,
    lastName: String,
  },
  addInput: UserBasicInfoInput,
  edit: WidgetMap({
    basicInfo: Form({
      input: UserBasicInfoInput,
    }),
    contactInfo: Form({
      input: UserContactInfoInput,
    }),
  }),
});

// AclUserInfoRpc.register("basic", UserBasicInfoInput)
