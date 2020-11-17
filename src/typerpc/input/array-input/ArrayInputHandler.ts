import { hasKeys } from "../../../common/object/hasKeys";
import { RequireOptionalKeys } from "../../../common/typings2/RequireOptionalKeys";
import { RpcUnresolvedConfig } from "../../Rpc";
import { IWidgetHandler, WidgetController } from "../../widget/Widget";
import { AbstractInputHandler } from "../AbstractInputHandler";
import {
  InputElement,
  InputErrorOrValue,
  InputValue,
  InputValueData,
  InputValueElement,
} from "../Input";
import { getLengthError } from "../LengthError";
import { ValueOrAwaitableFn } from "../ValueOrAwaitableFn";
import { AnyArrayInput } from "./ArrayInput";

type T = AnyArrayInput;

export class ArrayInputHandler
  extends AbstractInputHandler<T>
  implements IWidgetHandler<AnyArrayInput> {
  async handleAddNewItem(data): Promise<any> {
    const result = await this.controller
      .then(c => c.getTargetHandler("item"))
      .then(c => c.loadAndCheck(data));

    if ("error" in result) return result;
    const itemValue = this.config.addNewItem
      ? await this.config.addNewItem(result.value)
      : result.value;

    return await this.controller
      .then(c => c.getTargetHandler("item"))
      .then(c => c.getValueElement(itemValue));
  }

  getControllerConfig(): RpcUnresolvedConfig<WidgetController<T>> {
    return {
      item: this.config.itemConfig,
      newItem: this.config.newItemConfig,
    };
  }

  async getInputElement(): Promise<RequireOptionalKeys<InputElement<T>>> {
    return {
      maxLength: this.config.maxLength,
      minLength: this.config.minLength,
      item: await this.controller
        .then(c => c.getTargetHandler("item"))
        .then(c => c.getElement()),
      newItem: await this.controller
        .then(c => c.getTargetHandler("newItem"))
        .then(c => c.getElement()),
    };
  }

  async getValueElement(
    value: InputValue<T> | undefined
  ): Promise<InputValueElement<T>> {
    const itemHandler = await this.controller.then(c =>
      c.getTargetHandler("item")
    );
    const valueElement: any[] = [];
    for (const itemValue of value ||
      (await ValueOrAwaitableFn(this.config.default)) ||
      []) {
      valueElement.push(await itemHandler.getValueElement(itemValue));
    }
    return valueElement;
  }

  async loadAndCheck(data: InputValueData<T>): Promise<InputErrorOrValue<T>> {
    const items: any[] = [];
    const errorMap = {};
    const keys = new Set();
    const itemHandler = await this.controller.then(c =>
      c.getTargetHandler("item")
    );

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
