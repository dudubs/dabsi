import { hasKeys } from "../../../common/object/hasKeys";
import { mapObjectAsync } from "../../../common/object/mapObject";
import { Awaitable } from "../../../common/typings2/Async";
import { AnyRpc, RpcUnresolvedConfig } from "../../Rpc";
import { IWidgetHandler } from "../../widget/Widget";
import { mapChildrenHandlerAsync } from "../../widget/widget-map/mapChildrenHandlerAsync";
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

  // todo: mapChildren
  async getValueElement(
    value: InputValue<T> | undefined
  ): Promise<InputValueElement<T>> {
    return mapChildrenHandlerAsync(this, (handler, key) =>
      handler.getValueElement(value?.[key])
    );
  }

  async getInputElement(): Promise<InputElement<T>> {
    return {
      elementMap: await mapChildrenHandlerAsync(this, handler =>
        handler.getInputElement()
      ),
    };
  }

  async getValueFromConfig(
    valueConfig: InputValueConfig<T>
  ): Promise<InputValue<T>> {
    return mapChildrenHandlerAsync(this, (handler, key) => {
      handler.getValueFromConfig(valueConfig?.[key]);
    });
  }

  async loadAndCheck(
    dataMap: InputValueData<T>
  ): Promise<InputErrorOrValue<T>> {
    const errorMap: any = {};

    const valueMap = await mapChildrenHandlerAsync(this, (handler, key) =>
      handler.loadAndCheck(dataMap[key]).then(result => {
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
