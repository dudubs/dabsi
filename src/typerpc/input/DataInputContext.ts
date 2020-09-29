import { Lazy } from "../../common/patterns/lazy";
import { RequireOptionalKeys } from "../../common/typings";
import { DataRow } from "../../data/DataRow";
import { ContextualRpcContext } from "../ContextualRpc";
import { RpcConfig, RpcError } from "../Rpc";
import { AnyDataTable } from "../widget/DataTable";
import {
  WidgetConfig,
  WidgetController,
  WidgetElement,
} from "../widget/Widget";
import { AbstractNullableInputContext } from "./AbstractNullableInputContext";
import { BaseDataInputConfig, DataInputTable, DataInput } from "./DataInput";
import { InputCheckResult, InputData, InputType, InputValue } from "./Input";
import { ValueOrAwaitableFn } from "./ValueOrAwaitableFn";

type T = DataInput<unknown, any>;
type TTable = DataInputTable<unknown>;

export function getTableConfigForBaseDataInputConfig(
  config: BaseDataInputConfig<any, {}, {}, any, any>
): RpcConfig<AnyDataTable> {
  return ($) =>
    $({
      ...config.tableConfig,
      source: config.source,
      selection: config.selection,
      columns: {
        label: config.label,
        ...config.columns,
      },
    });
}

export class DataInputContext extends AbstractNullableInputContext<T> {
  protected getInputConfigForValue(
    value: InputType<T>["Value"]
  ): WidgetConfig<InputType<T>> {
    return { ...this.config, default: value ?? undefined };
  }

  @Lazy() get tableContext(): ContextualRpcContext<TTable> {
    return this.props.controller.getContext(
      getTableConfigForBaseDataInputConfig(this.config)
    );
  }

  getControllerConfig(): RpcConfig<WidgetController<T>> {
    return ($) => $(this.tableContext.config);
  }

  async getElement(): Promise<RequireOptionalKeys<WidgetElement<T>>> {
    const dataKeyOrRow = await ValueOrAwaitableFn(this.config.default);

    let dataRow: DataRow<unknown> | undefined;

    if (dataKeyOrRow) {
      if (typeof dataKeyOrRow === "object") {
        dataRow = dataKeyOrRow;
      } else {
        dataRow = await this.config.source.get(dataKeyOrRow);
      }
    } else {
      dataRow = undefined;
    }

    return {
      default:
        dataRow &&
        (await this.controllerContext.getTableRowFromDataRow(dataRow)),
    };
  }

  async loadAndCheckNotNull(
    key: NonNullable<InputData<T>>
  ): Promise<InputCheckResult<T>> {
    if (!(await this.config.source.filter({ $is: key }).has()))
      throw new RpcError(`Invalid data key "${key}".`);
    return { value: key };
  }
}
