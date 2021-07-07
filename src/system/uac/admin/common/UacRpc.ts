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
import UacGroupsTable from "../../common/UacGroupsTable";
import UacUsersTable from "../../common/UacUsersTable";

export class UacGroupForm extends DataForm(
  ObjectInput({
    groupName: InputWithAlreadyInUseError(TextInput),
  })
) {}

export class UacUserBasicForm extends DataForm(
  ObjectInput({
    loginName: InputWithAlreadyInUseError(TextInput),
    firstName: TextInput,
    lastName: TextInput,
  })
) {}

export class UacUserContactForm extends DataForm(
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

export class UacEditUser extends Rpc {
  @RpcContextual()
  basicForm!: UacUserBasicForm;

  @RpcContextual()
  contactForm!: UacUserContactForm;

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

export class UacEditGroup extends Rpc {
  @RpcContextual()
  form!: UacGroupForm;

  @RpcContextual()
  usersTable!: UacUsersTable;

  @RpcFuncational()
  updateUsers!: RpcMethod<[users: Record<string, boolean>]>;
}

export default class UacAdminRpc extends Rpc {
  static instance = AdminRpc.register("acl", UacAdminRpc);

  // groups management

  @RpcContextual()
  groupsTable!: UacGroupsTable;

  @RpcContextual()
  addNewGroupForm!: UacGroupForm;

  @RpcParametrial(() => UacEditGroup)
  editGroup!: DataParameter<UacEditGroup>;

  @RpcFuncational()
  deleteGroup!: (key: string) => Promise<void>;

  // users managemnt

  @RpcContextual()
  usersTable!: UacUsersTable;

  @RpcContextual()
  addNewUserForm!: UacUserBasicForm;

  @RpcParametrial(() => UacEditUser)
  editUser!: DataParameter<UacEditUser>;
}
