import { hasKeys } from "@dabsi/common/object/hasKeys";
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
import { IWidgetHandler } from "@dabsi/typerpc/widget/Widget";
import { mapChildrenHandlerAsync } from "@dabsi/typerpc/widget/widget-map/mapChildrenHandlerAsync";

type T = AnyInputMap;

export class InputMapHandler
  extends AbstractInputHandler<T>
  implements IWidgetHandler<T> {
  $mapConfig = this.config;

  // todo: mapChildren
  async getInputValueElement(
    valueMap: InputValue<T> | undefined
  ): Promise<InputValueElement<T>> {
    return mapChildrenHandlerAsync(this, (handler, key) => {
      const value = valueMap?.[key];
      if (value !== undefined) {
        return handler.getInputValueElement(value);
      }
    });
  }

  async getInputElement(): Promise<InputElement<T>> {
    return {
      elementMap: await mapChildrenHandlerAsync(this, handler =>
        handler.getInputElement()
      ),
    };
  }

  async getInputValueFromConfig(
    valueConfigMap: InputValueConfig<T>
  ): Promise<InputValue<T>> {
    return mapChildrenHandlerAsync(this, (handler, key) => {
      return handler.getInputValueFromConfig(valueConfigMap?.[key]);
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
