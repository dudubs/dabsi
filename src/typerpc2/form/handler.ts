import { Awaitable } from "@dabsi/common/typings2/Async";
import { PartialUndefinedKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import { createRpcHandler } from "@dabsi/typerpc2/createRpcHandler";
import { AnyForm, BaseForm } from "@dabsi/typerpc2/form/rpc";
import {
  InputValue,
  InputValueConfig,
} from "@dabsi/typerpc2/input/InputHandler";
import { RpcType } from "@dabsi/typerpc2/Rpc";
import { RpcConfigurator } from "@dabsi/typerpc2/RpcConfig";
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

// export type InferredForm<T extends AnyForm> = T extends
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
    async getElement(state): Promise<any> {
      return (await this.getContextualHandler("input")).getElement(state);
    },
  }
);
