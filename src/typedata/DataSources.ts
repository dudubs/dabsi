import { mapObject } from "@dabsi/common/object/mapObject";
import { Type } from "@dabsi/common/typings2/Type";
import { ClassResolver } from "@dabsi/typedata/ClassResolver";
import DataSourceResolver from "@dabsi/typedata/data-entity/DataSourceResolver";
import { DataSource } from "@dabsi/typedata/DataSource";
import { Consumer } from "@dabsi/typedi/Consumer";

//
export default function DataSources<T extends Record<string, Type<any>>>(
  typeMap: T
): ClassResolver<
  {
    [K in keyof T]: T[K] extends Type<infer U> ? DataSource<U> : never;
  }
> {
  return ClassResolver(
    Consumer(
      { resolve: DataSourceResolver },
      c => <any>mapObject(typeMap, type => c.resolve(type))
    )
  );
}
