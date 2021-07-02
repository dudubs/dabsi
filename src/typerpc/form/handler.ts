import { Awaitable } from "@dabsi/common/typings2/Async";
import { IfUndefined } from "@dabsi/common/typings2/boolean";
import { PartialUndefinedKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import { createRpcHandler } from "@dabsi/typerpc/createRpcHandler";
import { BaseForm, Form } from "@dabsi/typerpc/form/rpc";
import { ConfigOrFactory } from "@dabsi/typerpc/GenericConfig";
import {
  AnyInputWithConfig,
  InputValue,
  InputValueConfig,
} from "@dabsi/typerpc/input/InputHandler";
import { RpcType } from "@dabsi/typerpc/Rpc";
import { RpcConfigurator } from "@dabsi/typerpc/RpcConfig";
import {
  WidgetHandler,
  WidgetWithConfig,
} from "@dabsi/typerpc/widget/WidgetHandler";

declare module "./rpc" {
  interface BaseForm<T, V>
    extends WidgetWithConfig<
      BaseForm<T, V>,
      PartialUndefinedKeys<
        {
          valueConfig:
            | ConfigOrFactory<InputValueConfig<T>>
            | IfUndefined<InputValueConfig<T>, undefined>;

          inputConfig: RpcConfigurator<T>;
        },
        {
          submit(value: InputValue<T>): Awaitable<V>;
        }
      >
    > {}
}

export default WidgetHandler(
  BaseForm as RpcType<Form<AnyInputWithConfig, any>>,
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
      const input = await this.getContextualHandler("input");
      return {
        value: await input.getValueElement(
          await input.getValueFromConfig(
            await ConfigOrFactory(this.config.valueConfig)
          )
        ),
        input: await input.getElement(state),
      };
    },
  }
);
