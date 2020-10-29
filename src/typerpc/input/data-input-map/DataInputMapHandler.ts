import { hasKeys } from "../../../common/object/hasKeys";
import { RequireOptionalKeys } from "../../../common/typings";
import { RpcError, RpcUnresolvedConfig } from "../../Rpc";
import { WidgetController } from "../../widget/Widget";
import { AbstractInputHandler } from "../AbstractInputHandler";
import {
  InputElement,
  InputErrorOrValue,
  InputValue,
  InputValueData,
  InputValueElement,
} from "../Input";
import { AnyDataInputMap } from "./DataInputMap";

type T = AnyDataInputMap;

export class DataInputMapHandler extends AbstractInputHandler<T> {
  getControllerConfig(): RpcUnresolvedConfig<WidgetController<T>> {
    return {
      table: $ =>
        $({
          ...this.config.tableConfig,
          source: this.config.source,
          columns: this.config.columns,
        }),
      target: this.config.targetConfig,
      getRowController: $ =>
        $({
          load: async key => {
            if (
              !(await this.config.source.filter({ $is: String(key) }).hasRows())
            ) {
              throw new RpcError(`No have a key "${key}".`);
            }
            return key;
          },
          getTargetConfig: $ => $(this.config.targetConfig),
        }),
    };
  }

  async getInputElement(): Promise<RequireOptionalKeys<InputElement<T>>> {
    return {
      target: await this.controller
        .then(c => c.getTargetHandler("target"))
        .then(c => c.getElement()),
    };
  }

  async getValueElement(
    valueMap: InputValue<T> | undefined
  ): Promise<InputValueElement<T>> {
    const { table, target } = await this.controller.then(async c => ({
      table: await c.getTargetHandler("table"),
      target: await c.getTargetHandler("target"),
    }));

    let elementMap: Record<string, { $value }> = {};
    for (const dataRow of await this.config.source.getRows()) {
      const value =
        valueMap?.[dataRow.$id] ?? (await this.config.getTargetValue(dataRow));
      elementMap[dataRow.$id] = {
        ...(await table.loadRow(dataRow, true)),
        $value: await target.getValueElement(value),
      };
    }
    return elementMap;
  }

  async loadAndCheck(
    dataMap: InputValueData<T>
  ): Promise<InputErrorOrValue<T>> {
    const keys = Object.keys(dataMap);
    if (!keys.length) return { value: {} };

    let errorMap: any = {};
    let valueMap: any = {};
    const invalidKeys = new Set(keys);
    const target = await this.controller.then(c =>
      c.getTargetHandler("target")
    );
    for (const row of await this.config.source
      .createAsMutable()
      .filter({ $is: keys })
      .getRows()) {
      invalidKeys.delete(row.$id);

      const result = await target.loadAndCheck(dataMap[row.$id]);
      if ("error" in result) {
        errorMap[row.$id] = result.error;
      }
      if (result.value !== undefined) {
        valueMap[row.$id] = result.value;
      }
    }
    if (invalidKeys.size) {
      return {
        error: { type: "INVALID_KEYS", invalidKeys: [...invalidKeys] },
        value: valueMap,
      };
    }
    if (hasKeys(errorMap))
      return { error: { type: "ERROR_MAP", errorMap }, value: valueMap };
    return { value: valueMap };
  }
}
