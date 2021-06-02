import { hasKeys } from "@dabsi/common/object/hasKeys";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { IRpcHandler } from "@dabsi/old-typerpc/Rpc";
import { IWidgetHandler } from "@dabsi/old-typerpc/widget/Widget";
import { AbstractInputHandler } from "@dabsi/old-typerpc/input/AbstractInputHandler";
import {
  InputElement,
  InputErrorOrValue,
  InputValue,
  InputValueConfig,
  InputValueData,
  InputValueElement,
} from "@dabsi/old-typerpc/input/Input";
import { getLengthError } from "@dabsi/old-typerpc/input/LengthError";
import { AnyArrayInput } from "@dabsi/old-typerpc/input/array-input/ArrayInput";

type T = AnyArrayInput;

export class ArrayInputHandler
  extends AbstractInputHandler<T>
  implements IWidgetHandler<AnyArrayInput> {
  getInputValueFromConfig(
    valueConfig: InputValueConfig<T>
  ): Awaitable<InputValue<T>> {
    return valueConfig || [];
  }

  async $addNewItemCommand(data) {
    const result = await this.getChildHandler("item").then(c =>
      c.loadAndCheck(data)
    );

    if ("error" in result) return result;
    const itemValue = this.config.addNewItem
      ? await this.config.addNewItem(result.value)
      : result.value;

    return await this.getChildHandler("item").then(c =>
      c.getInputValueElement(itemValue)
    );
  }

  $itemConfig = this.config.itemConfig;
  $newItemConfig = this.config.newItemConfig;

  async getInputElement(): Promise<InputElement<T>> {
    return {
      maxLength: this.config.maxLength,
      minLength: this.config.minLength,
      item: await this.getChildHandler("item").then(h =>
        h.getElement(undefined)
      ),
      newItem: await this.getChildHandler("newItem").then(c =>
        c.getElement(undefined)
      ),
    };
  }

  async getInputValueElement(
    value: InputValue<T> | undefined
  ): Promise<InputValueElement<T>> {
    const itemHandler = await this.getChildHandler("item");
    const valueElement: any[] = [];
    for (const itemValue of value || []) {
      valueElement.push(await itemHandler.getInputValueElement(itemValue));
    }
    return valueElement;
  }

  async loadAndCheck(data: InputValueData<T>): Promise<InputErrorOrValue<T>> {
    const items: any[] = [];
    const errorMap = {};
    const keys = new Set();
    const itemHandler = await this.getChildHandler("item");

    const lengthError = getLengthError(data, this.config);
    if (lengthError) {
      return { error: lengthError, value: undefined };
    }

    const { getItemDataKey } = this.rpc.uniqueItem || {};
    for (const [index, itemData] of data.entries()) {
      const key: string = getItemDataKey
        ? getItemDataKey(itemData)
        : String(index);
      const result = await itemHandler.loadAndCheck(itemData);
      if ("error" in result) {
        errorMap[key] = result.error;
        continue;
      }
      if (getItemDataKey) {
        if (keys.has(key)) {
          errorMap[key] = "UNIQUE_ITEM";
          continue;
        }
        keys.add(key);
      }
      items.push(result.value);
    }

    if (hasKeys(errorMap)) {
      return { error: { type: "ERROR_MAP", errorMap }, value: items };
    }
    return { value: items };
  }
}
