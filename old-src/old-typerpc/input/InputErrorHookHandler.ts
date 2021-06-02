import { Call } from "@dabsi/common/typings2/Call";
import { RpcHookHandler } from "@dabsi/old-typerpc/RpcHook";
import { AnyInput } from "@dabsi/old-typerpc/input/Input";
import { Awaitable } from "@dabsi/common/typings2/Async";

export const InputErrorHookHandler: RpcHookHandler<
  AnyInput,
  {
    (data: any): Awaitable<any>;
  }
> = {
  symbol: Symbol("InputErrorHook"),
  resolveHookConfig(config) {
    if (
      config &&
      typeof config === "object" &&
      typeof config.$check === "function"
    ) {
      return [config.$config, config.$check];
    }
    return [config, undefined];
  },
  mergeHookConfig: (prevCheck, nextCheck) => {
    return async value => {
      return (await prevCheck(value)) ?? (await nextCheck(value));
    };
  },
  installHook(handler, check) {
    const { loadAndCheck: originalLoadAndCheck } = handler;
    handler.loadAndCheck = async function (data) {
      const result = await (originalLoadAndCheck.call as Call<
        typeof originalLoadAndCheck
      >)(this, data);

      if ("error" in result) return result;
      const error = await check(result.value);
      if (error != null) return { error, value: result.value };
      return result;
    };
    return handler;
  },
};
