import { DataRow } from "../../../typedata/DataRow";
import { RpcChildConfig } from "../../Rpc";
import { IWidgetHandler } from "../../widget/Widget";
import {
  ErrorOrValue,
  InputElement,
  InputError,
  InputValue,
  InputValueConfig,
  InputValueData,
  InputValueElement,
} from "../Input";
import { AbstractNullableInputHandler } from "../nullable-input/AbstractNullableInputHandler";
import { ValueOrAwaitableFn } from "../ValueOrAwaitableFn";
import { AnyDataInput } from "./DataInput";

type T = AnyDataInput;

export class DataInputHandler
  extends AbstractNullableInputHandler<T>
  implements IWidgetHandler<T> {
  $tableConfig: RpcChildConfig<T, "table"> = $ =>
    $({
      ...this.config.tableConfig,
      source: this.config.source,
      columns: this.config.columns,
    });

  getInputElement(): Promise<InputElement<T>> {
    return Promise.resolve({});
  }

  async getValueFromConfig(
    valueConfig: InputValueConfig<T>
  ): Promise<InputValue<T>> {
    valueConfig = await ValueOrAwaitableFn(valueConfig);
    if (!valueConfig) {
      return;
    }
    if (this.rpc.isValueDataRow) {
      if (typeof valueConfig === "string") {
        return await this.valueSource.get(valueConfig);
      }
      return valueConfig;
    }
    return typeof valueConfig === "object" //
      ? valueConfig.$key
      : valueConfig;
  }

  get valueSource() {
    return this.config.valueSource || this.config.source;
  }

  async getValueElement(
    value: InputValue<T> | undefined
  ): Promise<InputValueElement<T>> {
    if (!value) return undefined;

    let dataRow: DataRow<any> | undefined = undefined;

    if (typeof value === "object") {
      if (!this.config.valueSource) {
        dataRow = value;
      } else if (typeof value.$key === "string") {
        dataRow = await this.config.source.get(value.$key);
      }
    } else if (typeof value === "string") {
      dataRow = await this.config.source.get(value);
    }

    return (
      dataRow && (await (await this.getChildHandler("table")).loadRow(dataRow))
    );
  }

  async loadAndCheckNotNull(
    key: NonNullable<InputValueData<T>>
  ): Promise<ErrorOrValue<InputError<T>, NonNullable<InputValue<T>>>> {
    if (this.rpc.isValueDataRow) {
      const row = await this.valueSource.get(String(key));
      if (!row) {
        return { error: "INVALID_DATA_KEY", value: undefined };
      }
      return { value: row };
    }
    if (!(await this.config.source.filter({ $is: key }).hasRow())) {
      return { error: "INVALID_DATA_KEY", value: undefined };
    }
    return { value: key };
  }
}
