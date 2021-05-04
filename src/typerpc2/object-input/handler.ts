import { entries } from "@dabsi/common/object/entries";
import { hasKeys } from "@dabsi/common/object/hasKeys";
import { PartialUndefinedKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import { UndefinedIfEmptyObject } from "@dabsi/common/typings2/UndefinedIfEmptyObject";
import { RpcType } from "@dabsi/typerpc2";
import { createRpcHandler } from "@dabsi/typerpc2/createRpcHandler";
import { getRpcMetadata } from "@dabsi/typerpc2/getRpcMetadata";
import { Input } from "@dabsi/typerpc2/input/Input";
import {
  AnyInputWithConfig,
  InputHandler,
  InputValue,
  InputValueConfig,
  InputWithConfig,
} from "@dabsi/typerpc2/input/InputHandler";
import { BaseObjectInput } from "@dabsi/typerpc2/object-input/rpc";
import { RpcConfigurator } from "@dabsi/typerpc2/RpcConfig";
import { RpcHandler } from "@dabsi/typerpc2/RpcHandler";
import { RpcMemberType } from "@dabsi/typerpc2/RpcMembers";

export type AnyInputWithConfigMap = Record<string, AnyInputWithConfig>;

declare module "./rpc" {
  interface BaseObjectInput<T>
    extends InputWithConfig<
      ObjectInput<T>,
      UndefinedIfEmptyObject<
        PartialUndefinedKeys<
          {
            [K in keyof T]: RpcConfigurator<T[K]>;
          }
        >
      >,
      {
        [K in keyof T]: InputValue<T[K]>;
      },
      UndefinedIfEmptyObject<
        PartialUndefinedKeys<
          {
            [K in keyof T]: InputValueConfig<T[K]>;
          }
        >
      >
    > {}
}

export default InputHandler(
  (BaseObjectInput as any) as RpcType<BaseObjectInput<AnyInputWithConfigMap>>,
  {
    configCanBeUndefined: false,
    // handlerFactory: rpcType ...

    createMemberHandler(memberKey, memberType, propertyType) {
      if (memberType !== RpcMemberType.Contextual) return;
      if (!Input.isInputType(propertyType)) return;

      return function (inputType) {
        return createRpcHandler(inputType, this.config?.[memberKey]);
      };
    },
    helpers: {
      mapInput(
        callback: (
          inputHandler: RpcHandler<AnyInputWithConfig>,
          childKey: string
        ) => void
      ): Promise<Record<string, any>> {
        const result = {};
        const promises: Promise<any>[] = [];

        const metadata = getRpcMetadata(this.rpcType);

        for (const childInputKey of getRpcMetadata(this.rpcType)
          .contextualKeys) {
          if (!Input.isInputType(metadata.childTypeMap[childInputKey]))
            continue;

          promises.push(
            this.getContextualHandler<any, any>(childInputKey).then(
              async (childHandler: RpcHandler<AnyInputWithConfig>) => {
                result[childInputKey] = await callback(
                  childHandler,
                  childInputKey
                );
              }
            )
          );
        }
        return Promise.all(promises).then(() => result);
      },
    },
  },
  {
    getElement(state): Promise<Record<string, any>> {
      console.log({ getElement: this.rpcType.name });

      return this.mapInput((handler, key) => {
        console.log({ key });

        return handler.getElement(state?.[key]);
      });
    },
    getValueElement(value): Promise<Record<string, any>> {
      return this.mapInput((handler, key) =>
        handler.getValueElement(value?.[key])
      );
    },
    getValueFromConfig(valueConfig): Promise<Record<string, any>> {
      return this.mapInput((handler, key) =>
        handler.getValueFromConfig(valueConfig?.[key])
      );
    },
    async loadAndCheck(data) {
      const error = {};
      const value: Record<string, any> = await this.mapInput(
        async (handler, key) => {
          const result = await handler.loadAndCheck(data?.[key]);
          if ("error" in result) {
            return;
          }
          return result.value;
        }
      );
      if (hasKeys(error)) {
        return { error: { map: error } };
      }
      return { value };
    },
  }
);
