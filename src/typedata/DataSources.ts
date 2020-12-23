import { mapObject } from "@dabsi/common/object/mapObject";
import { Type } from "@dabsi/common/typings2/Type";
import DataSourceResolver from "@dabsi/typedata/data-entity/DataSourceResolver";
import { DataSource } from "@dabsi/typedata/DataSource";
import { Consumer } from "@dabsi/typedi/Consumer";
import { CustomResolver } from "@dabsi/typedi/Resolver";

//
export default function DataSources<T extends Record<string, Type<any>>>(
  typeMap: T
): CustomResolver<
  {
    [K in keyof T]: T[K] extends Type<infer U> ? DataSource<U> : never;
  }
> {
  return Consumer(
    { resolve: DataSourceResolver },
    c => <any>mapObject(typeMap, type => c.resolve(type))
  );
}
