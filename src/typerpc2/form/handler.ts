import { Awaitable } from "@dabsi/common/typings2/Async";
import { PartialUndefinedKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import { createRpcHandler } from "@dabsi/typerpc2/createRpcHandler";
import { AnyForm, BaseForm } from "@dabsi/typerpc2/form/rpc";
import { AnyInput } from "@dabsi/typerpc2/input/Input";
import {
  InputValue,
  InputValueConfig,
} from "@dabsi/typerpc2/input/InputHandler";
import { RpcType } from "@dabsi/typerpc2/Rpc";
import { RpcConfigurator } from "@dabsi/typerpc2/RpcConfig";
import { RpcHandler } from "@dabsi/typerpc2/RpcHandler";
import {
  WidgetHandler,
  WidgetWithConfig,
} from "@dabsi/typerpc2/widget/WidgetHandler";

declare module "./rpc" {
  interface BaseForm<T, V>
    extends WidgetWithConfig<
      BaseForm<T, V>,
      PartialUndefinedKeys<
        {
          valueConfig: InputValueConfig<T>;
          inputConfig: RpcConfigurator<T>;
        },
        {
          submit(value: InputValue<T>): Awaitable<V>;
        }
      >
    > {}
}

export default WidgetHandler(
  BaseForm as RpcType<AnyForm>,
  {},
  {
    handleInput(inputType) {
      return createRpcHandler(inputType, this.config.inputConfig);
    },
    async handleSubmit(data) {
      const result = await (
        await this.getContextualHandler("input")
      ).loadAndCheck(data);
      if ("error" in result) return result;
      return { value: await this.config.submit(result.value) };
      //
    },
    async getElement(state) {
      const input: RpcHandler<AnyInput> = await this.getContextualHandler(
        "input"
      );
      return {
        value: await input.getValueElement(
          await input.getValueFromConfig(this.config.valueConfig)
        ),
        input: await input.getElement(state),
      };
    },
  }
);
