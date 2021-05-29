import AdminRpc from "@dabsi/system/admin/common/rpc";
import {
  Rpc,
  RpcContextual,
  RpcFuncational,
  RpcParametrial,
} from "@dabsi/typerpc2";
import { DataForm } from "@dabsi/modules/data/common/DataForm";
import { DataTable } from "@dabsi/typerpc2/data-table/rpc";
import { Form } from "@dabsi/typerpc2/form/rpc";
import { InputWithAlreadyInUseError } from "@dabsi/typerpc2/input/InputWithError";
import { ObjectInput } from "@dabsi/typerpc2/object-input/rpc";
import { TextInput } from "@dabsi/typerpc2/text-input/rpc";
import { Reflector } from "@dabsi/common/reflection/Reflector";
import { DataParameter } from "@dabsi/modules/data/common/DataParameter";

export class ACL_GroupsTable extends DataTable({
  groupName: String,
  countUsers: Number,
}) {}

export class ACL_GroupInput extends ObjectInput({
  groupName: InputWithAlreadyInUseError(TextInput),
}) {}

export class ACL_AddNewGroupForm extends Form(ACL_GroupInput) {}

export default class ACL_AdminRpc extends Rpc {
  static instance = AdminRpc.register("acl", ACL_AdminRpc);

  @RpcContextual()
  groupsTable!: ACL_GroupsTable;

  @RpcContextual(() => DataForm(ACL_GroupInput))
  addNewGroupForm!: DataForm<ACL_GroupInput>;

  @RpcParametrial(() => DataForm(ACL_GroupInput))
  editGroupForm!: DataParameter<DataForm<ACL_GroupInput>>;
}
