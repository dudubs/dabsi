import { hasKeys } from "../../../common/object/hasKeys";
import { mapObjectAsync } from "../../../common/object/mapObject";
import { Awaitable } from "../../../common/typings2/Async";
import { AnyRpc, RpcUnresolvedConfig } from "../../Rpc";
import { IWidgetHandler } from "../../widget/Widget";
import { AbstractInputHandler } from "../AbstractInputHandler";
import {
  InputElement,
  InputErrorOrValue,
  InputValue,
  InputValueConfig,
  InputValueData,
  InputValueElement,
} from "../Input";
import { AnyInputMap } from "./InputMap";

type T = AnyInputMap;

export class InputMapHandler
  extends AbstractInputHandler<T>
  implements IWidgetHandler<T> {
  $mapConfig = this.config;

  getChildConfig(key: string): Awaitable<RpcUnresolvedConfig<AnyRpc>> {
    return this.config[key];
  }

  getValueElement(
    value: InputValue<T> | undefined
  ): Promise<InputValueElement<T>> {
    return mapObjectAsync(this.rpc.children, (target, key) =>
      this.getChildHandler("map")
        .then(c => c.getChildHandler(key))
        .then(h => h.getValueElement(value?.[key]))
    );
  }

  async getInputElement(): Promise<InputElement<T>> {
    return {
      elementMap: await mapObjectAsync(this.rpc.children, (target, key) =>
        this.getChildHandler("map")
          .then(c => c.getChildHandler(key))
          .then(h => h.getInputElement())
      ),
    };
  }

  async getValueFromConfig(
    valueConfig: InputValueConfig<T>
  ): Promise<InputValue<T>> {
    return mapObjectAsync(this.rpc.children, (target, key) => {
      this.getChildHandler("map")
        .then(c => c.getChildHandler(key))
        .then(h => h.getValueFromConfig(valueConfig?.[key]));
    });
  }

  async loadAndCheck(
    dataMap: InputValueData<T>
  ): Promise<InputErrorOrValue<T>> {
    const errorMap: any = {};
    const valueMap = await mapObjectAsync(this.rpc.children, (target, key) =>
      this.getChildHandler("map")
        .then(c => c.getChildHandler(key))
        .then(h => h.loadAndCheck(dataMap[key]))
        .then(result => {
          if ("error" in result) {
            errorMap[key] = result.error;
          }
          return result.value;
        })
    );

    if (hasKeys(errorMap)) {
      return { value: valueMap, error: { type: "ERROR_MAP", errorMap } };
    }
    return { value: valueMap };
  }
}
