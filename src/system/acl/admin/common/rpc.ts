import { DataForm } from "@dabsi/modules/data/common/DataForm";
import { DataParameter } from "@dabsi/modules/data/common/DataParameter";
import AdminRpc from "@dabsi/system/admin/common/rpc";
import {
  Rpc,
  RpcContextual,
  RpcFuncational,
  RpcParametrial,
} from "@dabsi/typerpc2";
import { DataTable } from "@dabsi/typerpc2/data-table/rpc";
import { Form } from "@dabsi/typerpc2/form/rpc";
import { InputWithAlreadyInUseError } from "@dabsi/typerpc2/input/InputWithError";
import { ObjectInput } from "@dabsi/typerpc2/object-input/rpc";
import { TextInput } from "@dabsi/typerpc2/text-input/rpc";

export class ACL_GroupsTable extends DataTable({
  groupName: String,
  countUsers: Number,
}) {}

export class ACL_UsersTable extends DataTable({
  loginName: String,
  firstName: String,
  lastName: String,
}) {}

export class ACL_GroupInput extends ObjectInput({
  groupName: InputWithAlreadyInUseError(TextInput),
}) {}

export class ACL_UserBasicInput extends ObjectInput({
  loginName: InputWithAlreadyInUseError(TextInput),
  firstName: TextInput,
  lastName: TextInput,
}) {}

export class ACL_UserContactInput extends ObjectInput({
  email: InputWithAlreadyInUseError(TextInput),
  mobilePhone: TextInput,
}) {}

export class ACL_AddNewGroupForm extends Form(ACL_GroupInput) {}

export class ACL_EditUser extends Rpc {
  @RpcContextual(() => DataForm(ACL_UserBasicInput))
  basicForm!: DataForm<ACL_UserBasicInput>;

  @RpcContextual(() => DataForm(ACL_UserContactInput))
  contactForm!: DataForm<ACL_UserContactInput>;

  // @RpcParameterial(()=> [ ...]) : DataParamter<>
}

export default class ACL_AdminRpc extends Rpc {
  static instance = AdminRpc.register("acl", ACL_AdminRpc);

  // groups management

  @RpcContextual()
  groupsTable!: ACL_GroupsTable;

  @RpcContextual(() => DataForm(ACL_GroupInput))
  addNewGroupForm!: DataForm<ACL_GroupInput>;

  @RpcParametrial(() => DataForm(ACL_GroupInput))
  editGroupForm!: DataParameter<DataForm<ACL_GroupInput>>;

  @RpcFuncational()
  deleteGroup!: (key: string) => Promise<void>;

  // users managemnt

  @RpcContextual()
  usersTable!: ACL_UsersTable;

  @RpcContextual(() => DataForm(ACL_UserBasicInput))
  addNewUserForm!: DataForm<ACL_UserBasicInput>;

  @RpcParametrial(() => ACL_EditUser)
  editUser!: DataParameter<ACL_EditUser>;
}
