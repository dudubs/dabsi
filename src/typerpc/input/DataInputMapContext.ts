import { entries } from "../../common/object/entries";
import { hasKeys } from "../../common/object/hasKeys";
import { RequireOptionalKeys } from "../../common/typings";
import { ContextualRpcContext } from "../ContextualRpc";
import { RpcConfig } from "../Rpc";
import { ConfigFactory } from "../RpcGenericConfig";
import {
  WidgetConfig,
  WidgetController,
  WidgetElement,
  WidgetType,
} from "../widget/Widget";
import { AbstractInputContext } from "./AbstractInputContext";
import { DataInputMap } from "./DataInputMap";
import {
  AnyInput,
  Input,
  InputCheckResult,
  InputData,
  InputType,
  InputValue,
} from "./Input";

type T = DataInputMap<AnyInput>;

export class DataInputMapContext extends AbstractInputContext<T> {
  protected getInputConfigForValue(
    value: InputType<T>["Value"]
  ): WidgetConfig<InputType<T>> {
    return { ...this.config };
  }

  getControllerConfig(): RpcConfig<WidgetController<T>> {
    return ($) =>
      $({
        source: this.config.source,
        getTargetConfig: ($, row) =>
          $(ConfigFactory(this.config.getTargetConfig, row)),
      });
  }

  getTargetContextFromRow(row): ContextualRpcContext<AnyInput> {
    return this.props.controller.target.getContext(
      ConfigFactory(this.config.getTargetConfig, row)
    );
  }

  async getElement(): Promise<RequireOptionalKeys<WidgetElement<T>>> {
    const items: Record<string, any> = {};

    for (const row of await this.config.source.items()) {
      items[row.$key] = await this.getTargetContextFromRow(row).getElement();
    }

    return items;
  }

  async loadAndCheck(data: InputData<T>): Promise<InputCheckResult<T>> {
    const value: any = {};
    const error: any = {};
    const keys = Object.keys(data);
    for (const row of await this.config.source
      .createAsMutable()
      .filter({ $is: keys })
      .items()) {
      const result = await this.getTargetContextFromRow(row).loadAndCheck(
        data[row.$key]
      );

      if ("error" in result) {
        error[row.$key] = result.error;
      } else {
        value[row.$key] = result.value;
      }
    }

    return hasKeys(error) ? { error, value } : { value };
  }

  getDataFromValue(keyToValue: InputValue<T>): InputData<T> {
    const data: Record<string, any> = {};

    const defaultTargetContext = this.getTargetContextFromRow(undefined);

    for (const [key, value] of entries(keyToValue)) {
      data[key] = defaultTargetContext.getDataFromValue(value);
    }

    return data;
  }
}
