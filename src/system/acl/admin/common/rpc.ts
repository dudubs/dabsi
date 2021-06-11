import { DataForm } from "@dabsi/modules/data/common/DataForm";
import { DataParameter } from "@dabsi/modules/data/common/DataParameter";
import AdminRpc from "@dabsi/system/admin/common/rpc";
import {
  Rpc,
  RpcContextual,
  RpcFuncational,
  RpcLocation,
  RpcParametrial,
} from "@dabsi/typerpc2";
import { Form } from "@dabsi/typerpc2/form/rpc";
import { InputWithAlreadyInUseError } from "@dabsi/typerpc2/input/InputWithCustomError";
import { ObjectInput } from "@dabsi/typerpc2/object-input/rpc";
import { TextInput } from "@dabsi/typerpc2/text-input/rpc";
import AclGroupsTable from "../../common/AclGroupsTable";
import AclUsersTable from "../../common/AclUsersTable";

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

  @RpcFuncational()
  updateGroups!: (groups: Record<string, boolean>) => Promise<void>;

  @RpcFuncational()
  getBasicInfo!: () => Promise<{
    loginName: string;
    firstName?: string;
    lastName?: string;
  }>;
}

export class ACL_EditGroup extends Rpc {
  @RpcContextual(() => DataForm(ACL_GroupInput))
  form!: DataForm<ACL_GroupInput>;

  @RpcContextual()
  usersTable!: AclUsersTable;

  @RpcFuncational()
  updateUsers!: (users: Record<string, boolean>) => Promise<void>;
}

export default class ACL_AdminRpc extends Rpc {
  static instance = AdminRpc.register("acl", ACL_AdminRpc);

  // groups management

  @RpcContextual()
  groupsTable!: AclGroupsTable;

  @RpcContextual(() => DataForm(ACL_GroupInput))
  addNewGroupForm!: DataForm<ACL_GroupInput>;

  @RpcParametrial(() => ACL_EditGroup)
  editGroup!: DataParameter<ACL_EditGroup>;

  @RpcFuncational()
  deleteGroup!: (key: string) => Promise<void>;

  // users managemnt

  @RpcContextual()
  usersTable!: AclUsersTable;

  @RpcContextual(() => DataForm(ACL_UserBasicInput))
  addNewUserForm!: DataForm<ACL_UserBasicInput>;

  @RpcParametrial(() => ACL_EditUser)
  editUser!: DataParameter<ACL_EditUser>;
}
