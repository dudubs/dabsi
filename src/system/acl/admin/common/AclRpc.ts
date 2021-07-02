import { IsNever } from "@dabsi/common/typings2/boolean/IsNever";
import { DataForm } from "@dabsi/modules/data/common/DataForm";
import { DataParameter } from "@dabsi/modules/data/common/DataParameter";
import AdminRpc from "@dabsi/system/admin/common/rpc";
import {
  Rpc,
  RpcContextual,
  RpcFuncational,
  RpcParametrial,
} from "@dabsi/typerpc";
import { InputWithAlreadyInUseError } from "@dabsi/typerpc/input/InputWithCustomError";
import { ObjectInput } from "@dabsi/typerpc/object-input/rpc";
import { TextInput } from "@dabsi/typerpc/text-input/rpc";
import AclGroupsTable from "../../common/AclGroupsTable";
import AclUsersTable from "../../common/AclUsersTable";

export class AclGroupForm extends DataForm(
  ObjectInput({
    groupName: InputWithAlreadyInUseError(TextInput),
  })
) {}

export class AclUserBasicForm extends DataForm(
  ObjectInput({
    loginName: InputWithAlreadyInUseError(TextInput),
    firstName: TextInput,
    lastName: TextInput,
  })
) {}

export class AclUserContactForm extends DataForm(
  ObjectInput({
    email: InputWithAlreadyInUseError(TextInput),
    mobilePhone: TextInput,
  })
) {}

export type RpcMethod<P extends any[] = [], R = never> = IsNever<R> extends true
  ? (...args: P) => Promise<void>
  : R extends Rpc
  ? (...args: P) => R
  : (...args: P) => Promise<R>;

export class AclEditUser extends Rpc {
  @RpcContextual()
  basicForm!: AclUserBasicForm;

  @RpcContextual()
  contactForm!: AclUserContactForm;

  @RpcFuncational()
  updateGroups!: RpcMethod<[groups: Record<string, boolean>]>;

  @RpcFuncational()
  getBasicInfo!: RpcMethod<
    [],
    {
      loginName: string;
      firstName?: string;
      lastName?: string;
    }
  >;
}

export class AclEditGroup extends Rpc {
  @RpcContextual()
  form!: AclGroupForm;

  @RpcContextual()
  usersTable!: AclUsersTable;

  @RpcFuncational()
  updateUsers!: RpcMethod<[users: Record<string, boolean>]>;
}

export default class AclAdminRpc extends Rpc {
  static instance = AdminRpc.register("acl", AclAdminRpc);

  // groups management

  @RpcContextual()
  groupsTable!: AclGroupsTable;

  @RpcContextual()
  addNewGroupForm!: AclGroupForm;

  @RpcParametrial(() => AclEditGroup)
  editGroup!: DataParameter<AclEditGroup>;

  @RpcFuncational()
  deleteGroup!: (key: string) => Promise<void>;

  // users managemnt

  @RpcContextual()
  usersTable!: AclUsersTable;

  @RpcContextual()
  addNewUserForm!: AclUserBasicForm;

  @RpcParametrial(() => AclEditUser)
  editUser!: DataParameter<AclEditUser>;
}
