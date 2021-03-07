import { hasKeys } from "@dabsi/common/object/hasKeys";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { AbstractInputHandler } from "@dabsi/typerpc/input/AbstractInputHandler";
import { AnyDataInputMap } from "@dabsi/typerpc/input/data-input-map/DataInputMap";
import {
  InputElement,
  InputErrorOrValue,
  InputValue,
  InputValueConfig,
  InputValueData,
  InputValueElement,
} from "@dabsi/typerpc/input/Input";
import { RpcChildConfig } from "@dabsi/typerpc/Rpc";
import { IWidgetHandler } from "@dabsi/typerpc/widget/Widget";

type T = AnyDataInputMap;

export class DataInputMapHandler
  extends AbstractInputHandler<T>
  implements IWidgetHandler<T> {
  $targetConfig: RpcChildConfig<T, "target"> = this.config.targetConfig;

  getInputValueFromConfig(
    valueConfig: InputValueConfig<T>
  ): Awaitable<InputValue<T>> {
    return {};
  }

  async getInputElement(): Promise<InputElement<T>> {
    return {
      target: await this.getChildHandler("target").then(c =>
        c.getElement(undefined)
      ),
    };
  }

  async getInputValueElement(
    valueMap: InputValue<T> | undefined
  ): Promise<InputValueElement<T>> {
    const { target } = {
      target: await this.getChildHandler("target"),
    };

    let elementMap: Record<string, { label; value }> = {};
    for (const dataRow of await this.config.source.getRows()) {
      const value =
        valueMap?.[dataRow.$key] ?? (await this.config.getRowValue(dataRow));
      elementMap[dataRow.$key] = {
        label: this.config.getRowLabel?.(dataRow) ?? dataRow.label,
        value: await target.getInputValueElement(value),
      };
    }
    return elementMap;
  }

  async loadAndCheck(
    dataMap: InputValueData<T>
  ): Promise<InputErrorOrValue<T>> {
    // if (!dataMap) dataMap = {};
    const keys = Object.keys(dataMap);
    if (!keys.length) return { value: {} };

    let errorMap: any = {};
    let valueMap: any = {};
    const invalidKeys = new Set(keys);
    const target = await this.getChildHandler("target");
    for (const row of await this.config.source
      .filter({ $is: keys })
      .getRows()) {
      invalidKeys.delete(row.$key);

      const result = await target.loadAndCheck(dataMap[row.$key]);
      if ("error" in result) {
        errorMap[row.$key] = result.error;
      }
      if (result.value !== undefined) {
        valueMap[row.$key] = result.value;
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
