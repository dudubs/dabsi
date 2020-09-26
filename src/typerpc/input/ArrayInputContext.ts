import { entries } from "../../common/object/entries";
import { hasKeys } from "../../common/object/hasKeys";
import { Lazy } from "../../common/patterns/lazy";
import { RequireOptionalKeys } from "../../common/typings";
import { ContextualRpcContext } from "../ContextualRpc";
import { RpcConfig, RpcError } from "../Rpc";
import {
  WidgetConfig,
  WidgetController,
  WidgetElement,
} from "../widget/Widget";
import { AbstractInputContext } from "./AbstractInputContext";
import { AnyArrayInput } from "./ArrayInput";
import { InputCheckResult, InputData, InputType, InputValue } from "./Input";
import { ValueOrAwaitableFn } from "./ValueOrAwaitableFn";

type T = AnyArrayInput;

export class ArrayInputContext
  extends AbstractInputContext<T>
  implements ContextualRpcContext<T> {
  protected getInputConfigForValue(
    value: InputType<T>["Value"]
  ): WidgetConfig<InputType<T>> {
    return { ...this.config, default: value };
  }

  @Lazy() get itemContext() {
    return this.props.item.getContext(this.config.itemConfig);
  }

  @Lazy() get newItemContext() {
    return this.props.newItem.getContext(this.config.newItemConfig);
  }

  getDataFromValue(value: InputValue<T>): InputData<T> {
    return value.map((item) => this.itemContext.getDataFromValue(item));
  }

  getControllerConfig(): RpcConfig<WidgetController<T>> {
    return {
      item: this.config.itemConfig,
      newItem: this.config.newItemConfig,
      addNewItem: async (data) => {
        const result = await this.newItemContext.loadAndCheck(data);
        if ("error" in result) return result;
        const itemValue = this.config.getItemValue
          ? this.config.getItemValue(result.value)
          : result.value;
        return {
          value: await this.itemContext
            .getContextForValue(itemValue)
            .getElement(),
        };
      },
    };
  }

  protected itemConfigCache = {};

  async getElement(): Promise<RequireOptionalKeys<WidgetElement<T>>> {
    const valuesElements: object[] = [];

    const values =
      this.config.default && (await ValueOrAwaitableFn(this.config.default));

    for (const value of values || []) {
      const context = this.itemContext.getContextForValue(value);
      // getValueElementFromValue
      const element = await context.getElement();
      const valueElement = this.props.item.props.getValueElementFromElement(
        element
      );
      valuesElements.push(valueElement);
    }

    return {
      default: valuesElements.length ? valuesElements : undefined,
      newItem: await this.newItemContext.getElement(),
      item: await this.itemContext.getElement(),
      maxLength: this.config?.maxLength,
      minLength: this.config?.minLength,
    };
  }

  async loadAndCheck(itemsData: InputData<T>): Promise<InputCheckResult<T>> {
    const values: InputValue<T> = [];
    const indexToError: Record<number, any> = {};

    const maxLength = this.config?.maxLength || Infinity;

    const { getKeyFromItem } = this.props;

    const keys = new Set();

    for (const [index, data] of itemsData.entries()) {
      if (keys.size === maxLength) {
        return { error: "TOO_MANY_ITEMS", value: values };
      }

      if (getKeyFromItem) {
        const key = getKeyFromItem(data);
        if (keys.has(key)) {
          return { error: "UNIQUE_ITEM", value: values };
        }
        keys.add(key);
      }

      const result = await this.itemContext.loadAndCheck(data);
      values.push(result.value);
      if ("error" in result) {
        indexToError[index] = result.error;
      }
    }

    if (values.length < (this.config?.minLength || 0))
      return { error: "TOO_FEW_ITEMS", value: values };

    if (hasKeys(indexToError))
      return { error: { children: indexToError }, value: values };
    return { value: values };
  }
}
