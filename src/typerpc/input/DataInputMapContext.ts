import { entries } from "../../common/object/entries";
import { hasKeys } from "../../common/object/hasKeys";
import { Lazy } from "../../common/patterns/lazy";
import { RequireOptionalKeys } from "../../common/typings";
import { ContextualRpcContext } from "../ContextualRpc";
import { RpcConfig } from "../Rpc";
import { AnyDataTable } from "../widget/DataTable";
import {
  WidgetConfig,
  WidgetController,
  WidgetElement,
} from "../widget/Widget";
import { AbstractInputContext } from "./AbstractInputContext";
import { getTableConfigForBaseDataInputConfig } from "./DataInputContext";
import { DataInputMap } from "./DataInputMap";
import {
  AnyInput,
  InputCheckResult,
  InputData,
  InputType,
  InputValue,
} from "./Input";

type T = DataInputMap<AnyInput, any>;

export class DataInputMapContext extends AbstractInputContext<T> {
  protected getInputConfigForValue(
    value: InputType<T>["Value"]
  ): WidgetConfig<InputType<T>> {
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

  getControllerConfig(): RpcConfig<WidgetController<T>> {
    return {
      table: ($) => $(this.tableContext.config),
      row: ($) =>
        $({
          source: this.config.source,
          getTargetConfig: ($, row) => {
            return $(
              this.targetContext.getConfigForValue(
                this.config.getTargetValue(row)
              )
            );
          },
        }),
    };
  }

  getTargetContextForRow(row): ContextualRpcContext<AnyInput> {
    return this.targetContext.getContextForValue(
      this.config.getTargetValue(row)
    );
  }

  async getElement(): Promise<RequireOptionalKeys<WidgetElement<T>>> {
    const children: WidgetElement<T>["children"] = [];
    for (const row of await this.config.source.items()) {
      children.push({
        row,
        target: await this.getTargetContextForRow(row).getElement(),
      });
    }
    return { children };
  }

  async loadAndCheck(data: InputData<T>): Promise<InputCheckResult<T>> {
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

      const result = await this.getTargetContextForRow(row).loadAndCheck(
        data[row.$key]
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
