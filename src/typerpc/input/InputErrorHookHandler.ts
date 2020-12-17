import { Call } from "@dabsi/common/typings2/Call";
import { RpcHookHandler } from "@dabsi/typerpc/RpcHook";
import { AnyInput } from "@dabsi/typerpc/input/Input";

export const InputErrorHookHandler: RpcHookHandler<AnyInput> = {
  symbol: Symbol("InputErrorHook"),
  resolveConfig(config, check) {
    if (
      config &&
      typeof config === "object" &&
      typeof config.$check === "function"
    ) {
      return [
        config.$config,
        async data => {
          return (await check?.(data)) ?? (await config.$check(data));
        },
      ];
    }
    return [config, check];
  },
  getHandler(handler, check) {
    const { loadAndCheck } = handler;
    handler.loadAndCheck = async function (data) {
      const result = await (loadAndCheck.call as Call<typeof loadAndCheck>)(
        this,
        data
      );
      if ("error" in result) return result;
      const error = await check(result.value);
      if (error != null) return { error, value: result.value };
      return result;
    };
    return handler;
  },
};
