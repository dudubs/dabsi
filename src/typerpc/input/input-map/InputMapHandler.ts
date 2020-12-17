import { hasKeys } from "@dabsi/common/object/hasKeys";
import { mapObjectAsync } from "@dabsi/common/object/mapObject";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { AnyRpc, RpcUnresolvedConfig } from "@dabsi/typerpc/Rpc";
import { IWidgetHandler } from "@dabsi/typerpc/widget/Widget";
import { mapChildrenHandlerAsync } from "@dabsi/typerpc/widget/widget-map/mapChildrenHandlerAsync";
import { AbstractInputHandler } from "@dabsi/typerpc/input/AbstractInputHandler";
import {
  InputElement,
  InputErrorOrValue,
  InputValue,
  InputValueConfig,
  InputValueData,
  InputValueElement,
} from "@dabsi/typerpc/input/Input";
import { AnyInputMap } from "@dabsi/typerpc/input/input-map/InputMap";

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
