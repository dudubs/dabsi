import { hasKeys } from "../../../common/object/hasKeys";
import { Awaitable } from "../../../common/typings2/Async";
import { IRpcHandler } from "../../Rpc";
import { AbstractInputHandler } from "../AbstractInputHandler";
import {
  InputElement,
  InputErrorOrValue,
  InputValue,
  InputValueConfig,
  InputValueData,
  InputValueElement,
} from "../Input";
import { getLengthError } from "../LengthError";
import { AnyArrayInput } from "./ArrayInput";

type T = AnyArrayInput;

export class ArrayInputHandler
  extends AbstractInputHandler<T>
  implements IRpcHandler<AnyArrayInput> {
  getValueFromConfig(
    valueConfig: InputValueConfig<T>
  ): Awaitable<InputValue<T>> {
    return valueConfig || [];
  }

  $addNewItemConfig = async data => {
    const result = await this.getChildHandler("item").then(c =>
      c.loadAndCheck(data)
    );

    if ("error" in result) return result;
    const itemValue = this.config.addNewItem
      ? await this.config.addNewItem(result.value)
      : result.value;

    return await this.getChildHandler("item").then(c =>
      c.getValueElement(itemValue)
    );
  };

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

  async getValueElement(
    value: InputValue<T> | undefined
  ): Promise<InputValueElement<T>> {
    const itemHandler = await this.getChildHandler("item");
    const valueElement: any[] = [];
    for (const itemValue of value || []) {
      valueElement.push(await itemHandler.getValueElement(itemValue));
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
