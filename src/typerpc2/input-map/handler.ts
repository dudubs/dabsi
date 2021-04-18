import { PartialUndefinedKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import { UndefinedIfEmptyObject } from "@dabsi/common/typings2/UndefinedIfEmptyObject";
import {
  InputValue,
  InputValueConfig,
  InputWithConfig,
} from "@dabsi/typerpc2/input/InputHandler";
import { GenericConfigOrFactory } from "@dabsi/typerpc2/RpcConfig";

declare module "./rpc" {
  interface IInputMap<T>
    extends InputWithConfig<
      InputMap<T>,
      UndefinedIfEmptyObject<
        PartialUndefinedKeys<
          {
            [K in keyof T]: GenericConfigOrFactory<T[K]>;
          }
        >
      >,
      {
        [K in keyof T]: InputValue<T[K]>;
      },
      { [K in keyof T]: InputValueConfig<T[K]> }
    > {}
}
