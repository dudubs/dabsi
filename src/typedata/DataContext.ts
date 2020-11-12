import { Connection } from "typeorm";
import { mapObject } from "../common/object/mapObject";
import { Type } from "../common/typings";
import { TypeResolver } from "../typedi/FnResolver";
import { DataRow } from "./DataRow";
import { DataSource } from "./DataSource";
import { EntityDataSource } from "./entity-data/EntityDataSource";
import { _consume } from "../typedi/internal/_consume";
import { Resolver } from "../typedi/Resolver";

export function DataContext<T extends Record<string, Type<any> | [Type<any>]>>(
  typeMap: T
): {
  [K in keyof T]: T[K] extends [Type<infer U>]
    ? Resolver<DataRow<U>>
    : T[K] extends Type<infer U>
    ? Resolver<DataSource<U>>
    : never;
} {
  return mapObject(typeMap, type =>
    Array.isArray(type)
      ? type[0]
      : Resolver.consume([Connection], connection =>
          EntityDataSource.create(type, connection)
        )
  ) as any;
}
