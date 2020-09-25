import { entries } from "../../common/object/entries";
import { hasKeys } from "../../common/object/hasKeys";
import { Lazy } from "../../common/patterns/lazy";
import { RequireOptionalKeys } from "../../common/typings";
import { ContextualRpcContext } from "../ContextualRpc";
import { RpcConfig, RpcError } from "../Rpc";
import { ConfigFactory } from "../RpcGenericConfig";
import {
  WidgetConfig,
  WidgetController,
  WidgetElement,
} from "../widget/Widget";
import { AbstractInputContext } from "./AbstractInputContext";
import { AnyArrayInput } from "./ArrayInput";
import {
  AnyInput,
  InputCheckResult,
  InputData,
  InputType,
  InputValue,
} from "./Input";
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

  @Lazy() get defaultItemContext() {
    return this.controllerProps.items.item.getContext(this.config.itemConfig);
  }

  @Lazy() get newItemContext() {
    return this.controllerProps.items.newItem.getContext(
      this.config.newItemConfig
    );
  }

  getDataFromValue(value: InputValue<T>): InputData<T> {
    return value.map((item) => this.defaultItemContext.getDataFromValue(item));
  }

  getControllerConfig(): RpcConfig<WidgetController<T>> {
    return {
      item: this.config.itemConfig,
      newItem: this.config.newItemConfig,
      getItemElement: async (data) => {
        const result = await this.newItemContext.loadAndCheck(data);
        if ("error" in result) return result;
        const itemValue = this.config.getItemValue
          ? this.config.getItemValue(result.value)
          : result.value;
        return {
          value: await this.defaultItemContext
            .getContextForValue(itemValue)
            .getElement(),
        };
      },
    };
  }

  protected itemConfigCache = {};

  async getElement(): Promise<RequireOptionalKeys<WidgetElement<T>>> {
    const items: object[] = [];

    const values =
      this.config.default && (await ValueOrAwaitableFn(this.config.default));

    for (const value of values || []) {
      const context = this.defaultItemContext.getContextForValue(value);
      const element = await context.getElement();

      items.push(element);
    }

    return {
      items,
      maxLength: this.config?.maxLength,
      minLength: this.config?.minLength,
      newItem: await this.newItemContext.getElement(),
    };
  }

  async loadAndCheck(keyToData: InputData<T>): Promise<InputCheckResult<T>> {
    const values: InputValue<T> = [];
    const errors: Record<string, any> = {};

    const maxLength = this.config?.maxLength || Infinity;

    const { getKeyFromItem } = this.props;
    for (const [key, data] of entries(keyToData)) {
      if (getKeyFromItem) {
        const keyFromData = getKeyFromItem(data);
        if (key !== keyFromData) {
          throw new RpcError(
            `Invalid data for key "${key}" != "${keyFromData}".`
          );
        }
      }

      if (values.length === maxLength)
        return { error: "TOO_MANY_ITEMS", value: values };

      const result = await this.defaultItemContext.loadAndCheck(data);

      if ("error" in result) {
        errors[key] = result.error;
      } else {
        values.push(result.value);
      }
    }

    if (values.length < (this.config?.minLength || 0))
      return { error: "TOO_FEW_ITEMS", value: values };

    if (hasKeys(errors)) return { error: errors, value: values };
    return { value: values };
  }
}
