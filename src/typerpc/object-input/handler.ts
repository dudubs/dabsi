import { hasKeys } from "@dabsi/common/object/hasKeys";
import { PartialUndefinedKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import { UndefinedIfEmptyObject } from "@dabsi/common/typings2/UndefinedIfEmptyObject";
import { RpcType } from "@dabsi/typerpc";
import { createRpcHandler } from "@dabsi/typerpc/createRpcHandler";
import { getRpcMetadata } from "@dabsi/typerpc/getRpcMetadata";
import { Input } from "@dabsi/typerpc/input/Input";
import {
  AnyInputWithConfig,
  InputHandler,
  InputValue,
  InputValueConfig,
  InputWithConfig,
} from "@dabsi/typerpc/input/InputHandler";
import { BaseObjectInput, ObjectInput } from "@dabsi/typerpc/object-input/rpc";
import { RpcConfigurator } from "@dabsi/typerpc/RpcConfig";
import { RpcHandler } from "@dabsi/typerpc/RpcHandler";
import { RpcMemberType } from "@dabsi/typerpc/RpcMembers";

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
  (BaseObjectInput as any) as RpcType<ObjectInput<AnyInputWithConfigMap>>,
  {
    configCanBeUndefined: false,
    // handlerFactory: rpcType ...

    createMemberHandler(member) {
      if (member.type !== RpcMemberType.Contextual) return;
      if (!Input.isInputType(member.propertyType)) return;

      return function (inputType) {
        return createRpcHandler(inputType, this.config?.[member.key]);
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
      return this.mapInput((handler, key) => {
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
            error[key] = result.error;
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
