import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import { Constructor } from "@dabsi/common/typings2/Constructor";
import { DataRowTicker } from "@dabsi/modules/data/DataRowTicker";
import { DataTicker } from "@dabsi/modules/data/DataTicker";
import { DataSourceFactory2 } from "@dabsi/modules/DbModule";
import { DataExp } from "@dabsi/typedata/exp/exp";
import { Inject, Injectable, Resolver, ResolverMap } from "@dabsi/typedi";
import { ConsumeArgs, ResolverDeps } from "@dabsi/typedi/consume";
import { ResolverOrConsumeArgs } from "@dabsi/typedi/ResolverOrConsumeArgs";

export const getRowKeyParameter = WeakMapFactory(
  (rowType: Function) =>
    class {
      // @ts-ignore
      static get name() {
        return `<DataRowKeyParameter ${rowType.name}>`;
      }
      constructor(readonly key: string) {}
    }
);

export function RowKeyParameterResolver(
  rowType: Function,
  rowKeyResolver: Resolver<string>
): ResolverMap {
  const RowKeyAsPararameter = getRowKeyParameter(rowType);
  return Resolver(
    RowKeyAsPararameter,
    [rowKeyResolver],
    rowKey => new RowKeyAsPararameter(rowKey)
  );
}

@Injectable()
export default class DataContext {
  constructor(
    readonly getSource: DataSourceFactory2,
    readonly dataTicker: DataTicker,
    @Inject(c => c)
    readonly context: ResolverMap
  ) {}

  getParameterKey(rowType: Function): string | null {
    return (
      Resolver.resolve(
        Resolver.optional(getRowKeyParameter(rowType)),
        this.context
      )?.key || null
    );
  }

  getParameter<T>(rowType: Constructor<T>): DataRowTicker<T> {
    const rowKey = this.getParameterKey(rowType);
    return this.dataTicker.getRowTicker(rowType, rowKey);
  }

  async checkUnique<T>(
    rowType: Constructor<T>,
    filter: DataExp<T>
  ): Promise<"ALREADY_IN_USE" | undefined> {
    const rowKey = this.getParameterKey(rowType);
    const row = await this.getSource(rowType).filter(filter).pick([]).get();
    if (!row || row.$key === rowKey) return;
    return "ALREADY_IN_USE";
  }
}
