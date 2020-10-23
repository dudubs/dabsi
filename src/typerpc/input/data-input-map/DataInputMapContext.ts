import { hasKeys } from "../../../common/object/hasKeys";
import { Lazy } from "../../../common/patterns/lazy";
import { Awaitable, RequireOptionalKeys } from "../../../common/typings";
import { ConfigFactory } from "../../ConfigFactory";
import { ContextualRpcContext } from "../../old/ContextualRpc";
import { RpcConfigOld } from "../../old/Old";
import { AnyDataTable } from "../../widget/data-table/DataTable";
import {
  WidgetConfig,
  WidgetController,
  WidgetElement,
  WidgetType,
} from "../../widget/Widget";
import { AbstractInputContext } from "../AbstractInputContext";
import { getTableConfigForBaseDataInputConfig } from "../data-input/DataInputContext";
import { AnyDataInputMap, DataInputMap } from "./DataInputMap";
import {
  AnyInput,
  InputCheckResultType,
  InputValueData,
  InputType,
  InputValue,
} from "../Input";

type T = AnyDataInputMap;

export class DataInputMapContext extends AbstractInputContext<T> {
  protected getInputConfigForValue(
    value: InputType<T>["Value"]
  ): WidgetConfig<WidgetType<T>> {
    return { ...this.config };
  }

  @Lazy() get targetContext(): ContextualRpcContext<AnyInput> {
    return this.props.target.getContext(this.config.targetConfig);
  }

  @Lazy() get tableContext(): ContextualRpcContext<AnyDataTable> {
    return this.props.table.getContext(
      getTableConfigForBaseDataInputConfig(this.config)
    );
  }

  getControllerConfig(): RpcConfigOld<WidgetController<T>> {
    return {
      table: async $ => $(await this.tableContext.at("config")),
      row: $ =>
        $({
          source: this.config.source,
          getTargetConfig: async ($, row) =>
            $(
              await this.targetContext.call(
                "getConfigForValue",
                this.config.getTargetValue(row)
              )
            ),
        }),
    };
  }

  getTargetHandlerForRow(row): ContextualRpcContext<AnyInput> {
    return this.targetContext.then(c =>
      c.getHandlerForValue(this.config.getTargetValue(row))
    );
  }

  async getElement(): Promise<RequireOptionalKeys<WidgetElement<T>>> {
    const children: WidgetElement<T>["children"] = [];
    for (const row of await this.config.source.items()) {
      children.push({
        row,
        target: await this.getTargetHandlerForRow(row).then(c =>
          c.getElement()
        ),
      });
    }
    return { children };
  }

  async loadAndCheck(
    data: InputValueData<T>
  ): Promise<InputCheckResultType<T>> {
    const keyToValue: any = {};
    const keyToError: any = {};
    const keys = Object.keys(data);

    if (!keys.length) {
      return { value: {} };
    }

    const invalidKeys = new Set(keys);

    for (const row of await this.config.source
      .createAsMutable()
      .filter({ $is: keys })
      .items()) {
      invalidKeys.delete(row.$key);

      const result = await this.getTargetHandlerForRow(row).then(c =>
        c.loadAndCheck(data[row.$key])
      );

      if ("error" in result) {
        keyToError[row.$key] = result.error;
      } else {
        keyToValue[row.$key] = result.value;
      }
    }

    if (invalidKeys.size) {
      return { error: { invalidKeys: [...invalidKeys] }, value: keyToValue };
    }

    return hasKeys(keyToError)
      ? { error: { children: keyToError }, value: keyToValue }
      : { value: keyToValue };
  }
}
