import { Type } from "../../common/typings";
import { DataRow } from "../../typedata/DataRow";
import { DataSelector } from "../../typedata/DataSelector";
import { DataSource } from "../../typedata/DataSource";
import { ResolveMap } from "../../typedi/ResolveMap";
import { Resolver } from "../../typedi/Resolver";
import { Session } from "./acl/Session";
import { UserFullName } from "./acl/User";

export class SystemSession extends DataSelector(Session, {
  pick: [],
  relations: {
    user: {
      pick: [],
      fields: {
        fullName: UserFullName,
      },
    },
  },
} as const) {}

export const SystemSessionResolver = Resolver<DataRow<SystemSession>>();

export const GetDataSourceResolver = Resolver<
  <T>(type: Type<T>) => DataSource<T>
>();

export const SystemContextResolver = ResolveMap({
  session: SystemSessionResolver,
  getDataSource: GetDataSourceResolver,
});
