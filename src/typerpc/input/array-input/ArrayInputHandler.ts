import { RequireOptionalKeys } from "../../../common/typings";
import { RpcUnresolvedConfig } from "../../Rpc";
import {
  IWidgetHandler,
  WidgetController,
  WidgetElement,
} from "../../widget/Widget";
import { AbstractInputHandler } from "../AbstractInputHandler";
import { InputErrorOrValue, InputValue, InputValueData } from "../Input";
import { AnyArrayInput } from "./ArrayInput";

type T = AnyArrayInput;

export class ArrayInputHandler
  extends AbstractInputHandler<T>
  implements IWidgetHandler<AnyArrayInput> {
  async handleAddNewItem(data): Promise<any> {
    const result = await this.controllerHandler
      .call("getTargetHandler", "item")
      .call("loadAndCheck", data);

    if ("error" in result) return result;
    const itemValue = this.config.getItemValue
      ? await this.config.getItemValue(result.value)
      : result.value;

    const itemElement = await this.controllerHandler
      .call("getTargetHandler", "item")
      .call("getHandlerForValue", itemValue)
      .call("getElement");
    return {
      value: this.rpc.item.getValueElementFromElement(itemElement),
    };
  }

  getConfigForValue(value: InputValue<T>): RpcUnresolvedConfig<T> {
    return { ...this.config, default: value };
  }

  getControllerConfig(): RpcUnresolvedConfig<WidgetController<T>> {
    return {
      item: this.config.itemConfig,
      newItem: this.config.newItemConfig,
    };
  }

  getDefaultValue(): Promise<InputValue<T> | undefined> {
    return Promise.resolve(undefined);
  }

  getElement(): Promise<RequireOptionalKeys<WidgetElement<T>>> {
    return Promise.resolve(undefined);
  }

  loadAndCheck(valueData: InputValueData<T>): Promise<InputErrorOrValue<T>> {
    return Promise.resolve(undefined);
  }
}
