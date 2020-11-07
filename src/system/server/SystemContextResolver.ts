import { Connection } from "typeorm";
import { Type } from "../../common/typings";
import { DataRow } from "../../typedata/DataRow";
import { DataSelector } from "../../typedata/DataSelector";
import { DataSource } from "../../typedata/DataSource";
import { EntityDataSource } from "../../typedata/entity-data/EntityDataSource";
import { Consumer } from "../../typedi/Consumer";
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
        // TODO: Maybe not?
        fullName: UserFullName,
      },
    },
  },
} as const) {}

export const SystemSessionResolver = Resolver<DataRow<SystemSession>>();

export const ConnectionResolver = Resolver<Connection>();

export const GetDataSourceResolver = Consumer(
  [ConnectionResolver],
  connection => <T>(type: Type<T>): DataSource<T> =>
    EntityDataSource.create(type, () => connection)
);

export const SystemContextResolver = ResolveMap({
  session: SystemSessionResolver,
  getDataSource: GetDataSourceResolver,
});
