import { DataRow } from "@dabsi/typedata/row";
import { RpcChildConfig } from "@dabsi/old-typerpc/Rpc";
import { IWidgetHandler } from "@dabsi/old-typerpc/widget/Widget";
import {
  ErrorOrValue,
  InputElement,
  InputError,
  InputValue,
  InputValueConfig,
  InputValueData,
  InputValueElement,
} from "@dabsi/old-typerpc/input/Input";
import { AbstractNullableInputHandler } from "@dabsi/old-typerpc/input/nullable-input/AbstractNullableInputHandler";
import { ValueOrAwaitableFn } from "@dabsi/old-typerpc/input/ValueOrAwaitableFn";
import { AnyDataInput } from "@dabsi/old-typerpc/input/data-input/rpc";

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

  async getInputValueFromConfig(
    valueConfig: InputValueConfig<T>
  ): Promise<InputValue<T>> {
    valueConfig = await ValueOrAwaitableFn(valueConfig);
    if (!valueConfig) {
      return;
    }
    if (this.rpc.isValueDataRow) {
      if (typeof valueConfig === "string") {
        return await this.valueSource.fetch(valueConfig);
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

  async getInputValueElement(
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
      const row = await this.valueSource.fetch(String(key));
      if (!row) {
        return { error: "INVALID_DATA_KEY", value: undefined };
      }
      return { value: row };
    }
    if (!(await this.config.source.filter({ $is: key }).has())) {
      return { error: "INVALID_DATA_KEY", value: undefined };
    }
    return { value: key };
  }
}
