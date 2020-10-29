import { RequireOptionalKeys } from "../../../common/typings";
import { DataRow } from "../../../typedata/DataRow";
import { RpcError, RpcUnresolvedConfig } from "../../Rpc";
import { WidgetController } from "../../widget/Widget";
import {
  ErrorOrValue,
  InputElement,
  InputError,
  InputType,
  InputValue,
  InputValueData,
  InputValueElement,
} from "../Input";
import { AbstractNullableInputHandler } from "../nullable-input/AbstractNullableInputHandler";
import { ValueOrAwaitableFn } from "../ValueOrAwaitableFn";
import { AnyDataInput } from "./DataInput";

type T = AnyDataInput;

export class DataInputHandler extends AbstractNullableInputHandler<T> {
  getControllerConfig(): RpcUnresolvedConfig<WidgetController<T>> {
    return $ =>
      $({
        ...this.config.tableConfig,
        source: this.config.source,
        columns: this.config.columns,
      });
  }

  getInputElement(): Promise<RequireOptionalKeys<InputElement<T>>> {
    return Promise.resolve({});
  }

  async getValueElement(
    dataKey: InputValue<T> | undefined
  ): Promise<InputValueElement<T>> {
    let dataRow: DataRow<any> | undefined = undefined;
    if (!dataKey) {
      const dataKeyOrRow = await ValueOrAwaitableFn(this.config.default);
      if (dataKeyOrRow && typeof dataKeyOrRow === "object") {
        dataRow = dataKeyOrRow;
      } else if (dataKeyOrRow) {
        dataKey = String(dataKeyOrRow);
      }
    }
    if (dataKey && !dataRow) {
      dataRow = await this.config.source.get(dataKey);
    }
    return dataRow && (await this.controller.then(c => c.loadRow(dataRow)));
  }

  async loadAndCheckNotNull(
    key: NonNullable<InputValueData<T>>
  ): Promise<ErrorOrValue<InputError<T>, NonNullable<InputValue<T>>>> {
    if (this.config.loadSource) {
      const row = await this.config.loadSource.get(String(key));
      if (!row) {
        return { error: "INVALID_DATA_KEY", value: undefined };
      }
      return { value: row };
    }
    if (!(await this.config.source.filter({ $is: key }).hasRows())) {
      return { error: "INVALID_DATA_KEY", value: undefined };
    }
    return { value: key };
  }
}
