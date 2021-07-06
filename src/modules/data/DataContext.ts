import AsyncProcess from "@dabsi/common/async/AsyncProcess";
import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import { Constructor } from "@dabsi/common/typings2/Constructor";
import { DataRowTicker } from "@dabsi/modules/data/DataRowTicker";
import { DataSourceFactory2 } from "@dabsi/modules/DbModule";
import { DataExp } from "@dabsi/typedata/exp/exp";
import { Inject, Injectable, Resolver, ResolverMap } from "@dabsi/typedi";

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

const _parameterMap = new WeakMap<
  AsyncProcess,
  Map<Function, Map<string | null, DataRowTicker<any>>>
>();

@Injectable()
export default class DataContext {
  constructor(
    readonly getSource: DataSourceFactory2,
    readonly process: AsyncProcess,
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

  get _parameterMap(): Map<Function, Map<string | null, DataRowTicker>> {
    return _parameterMap.touch(this.process, () => new Map());
  }

  getRow<T>(rowType: Constructor<T>, rowKey: string | null): DataRowTicker<T> {
    return this._parameterMap
      .touch(rowType, () => new Map())
      .touch(
        rowKey,
        () =>
          new DataRowTicker(this.getSource, rowType, rowKey, callback =>
            this.process.push(callback)
          )
      );
  }

  getParameter<T>(rowType: Constructor<T>): DataRowTicker<T> {
    return this.getRow(rowType, this.getParameterKey(rowType));
  }

  async checkUnique<T>(
    rowType: Constructor<T>,
    filter: DataExp<T>
  ): Promise<"ALREADY_IN_USE" | undefined> {
    const rowKey = this.getParameterKey(rowType);
    const row = await this.getSource(rowType).filter(filter).pick([]).fetch();
    if (!row || row.$key === rowKey) return;
    return "ALREADY_IN_USE";
  }
}
