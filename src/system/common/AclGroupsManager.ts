import { DataManager } from "../../typerpc/data-manager/DataManager";
import { DataManagerRouter } from "../../typerpc/data-manager/DataManagerRouter";
import { InputMap } from "../../typerpc/input/input-map/InputMap";
import { InputErrorHook } from "../../typerpc/input/InputErrorHook";
import { NameInput } from "./NameInput";

export const AclGroupInput = InputMap({
  groupName: InputErrorHook<"ALREADY_EXISTS">()(NameInput),
});

export const AclGroupsManager = DataManager({
  addInput: AclGroupInput,
  tableRowType: { groupName: String },
});

export const AclGroupsManagerRouter = DataManagerRouter(AclGroupsManager);
