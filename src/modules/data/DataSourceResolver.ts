import { mapObject } from "../../common/object/mapObject";
import { Constructor } from "../../common/typings2/Constructor";
import { DataSource } from "../../typedata/DataSource";
import { Resolver } from "../../typedi";
import DataSourceFactroyResolver from "./DataSourceFactroyResolver";

export default function <T extends Constructor<any>>(
  entityType: T
): Resolver<DataSource<InstanceType<T>>>;
export default function <T extends Record<string, Constructor<any>>>(
  entityTypeMap: T
): Resolver<
  {
    [K in keyof T]: DataSource<InstanceType<T[K]>>;
  }
>;

export default function DataSourceResolver(arg): any {
  if (typeof arg === "function") {
    return Resolver.consume([DataSourceFactroyResolver], getDataSource =>
      getDataSource(arg)
    );
  } else {
    return Resolver.object(
      mapObject(arg as Record<string, Constructor<any>>, entityType =>
        DataSourceResolver(entityType)
      )
    );
  }
}
