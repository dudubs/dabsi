import { Constructor } from "@dabsi/common/typings2/Constructor";
import { DataRowContext } from "@dabsi/modules/data/DataRowContext";
import { DataSourceFactory2 } from "@dabsi/modules/DbModule";
import { DataExp } from "@dabsi/typedata/exp/exp";
import { Resolver } from "@dabsi/typedi";

export function DataUniqueChecker<T>(
  rowType: Constructor<T>
): Resolver<(filter: DataExp<T>) => Promise<"ALREADY_IN_USE" | undefined>> {
  return Resolver(
    [DataRowContext(rowType), DataSourceFactory2],
    (rowContext, getDataSource) => async filter => {
      const row = await getDataSource(rowType) //
        .filter(filter)
        .pick([])
        .get();

      if (!row || row.$key === rowContext.$key) return;
      return "ALREADY_IN_USE";
    }
  );
}
