import { Lazy } from "../../../common/patterns/lazy";
import { Awaitable, RequireOptionalKeys } from "../../../common/typings";
import { DataRow } from "../../../data/DataRow";
import { ConfigFactory } from "../../ConfigFactory";
import { ContextualRpcContext } from "../../old/ContextualRpc";
import { RpcConfigOld } from "../../old/Old";
import { RpcError } from "../../Rpc";
import { AnyDataTable } from "../../widget/data-table/DataTable";
import {
  WidgetConfig,
  WidgetController,
  WidgetElement,
  WidgetType,
} from "../../widget/Widget";
import { AbstractNullableInputContext } from "../nullable-input/AbstractNullableInputContext";
import {
  BaseDataInputConfig,
  DataInputTable,
  DataInput,
  AnyDataInput,
  TBaseDataInput,
} from "./DataInput";
import {
  InputCheckResultType,
  InputValueData,
  InputType,
  InputValue,
} from "../Input";
import { ValueOrAwaitableFn } from "../ValueOrAwaitableFn";

type T = AnyDataInput;
type TTable = DataInputTable<unknown>;

export function getTableConfigForBaseDataInputConfig(
  config: BaseDataInputConfig<TBaseDataInput, {}, {}>
): RpcConfigOld<AnyDataTable> {
  return $ =>
    $({
      ...config.tableConfig,
      source: config.source,
      columns: config.columns,
    });
}

export class DataInputContext extends AbstractNullableInputContext<T> {
  test() {}
  protected getInputConfigForValue(
    value: InputType<T>["Value"]
  ): WidgetConfig<WidgetType<T>> {
    return { ...this.config, default: value ?? undefined };
  }

  @Lazy() get tableContext(): ContextualRpcContext<TTable> {
    return this.props.controller.getContext(
      getTableConfigForBaseDataInputConfig(this.config)
    );
  }

  getControllerConfig(): RpcConfigOld<WidgetController<T>> {
    return async $ => $(await this.tableContext.at("config"));
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
        (await this.controllerContext.then(c =>
          c.getTableRowFromDataRow(dataRow)
        )),
    };
  }

  async loadAndCheckNotNull(
    key: NonNullable<InputValueData<T>>
  ): Promise<InputCheckResultType<T>> {
    if (!(await this.config.source.filter({ $is: key }).has()))
      throw new RpcError(`Invalid data key "${key}".`);
    return { value: key };
  }

  async getDefaultValue(): Promise<InputValue<T> | undefined> {
    const value = await ValueOrAwaitableFn(this.config.default);
    if (typeof value === "object") return value.$key;
    return String(value);
  }
}
