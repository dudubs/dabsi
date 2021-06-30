import { Awaitable } from "@dabsi/common/typings2/Async";
import { inspect } from "@dabsi/logging/inspect";
import { createHook, executionAsyncId } from "async_hooks";
import fs from "fs";

const log = o => {
  fs.writeFileSync(1, inspect(o) + "\n");
};

export default function useAsyncProcess<T>(
  options: {
    onForegorund?();
    onBackground?();
    onComplete?();
  },
  callback: () => Awaitable<T>
): Promise<T> {
  return new Promise((resolve, reject) => {
    setImmediate(() => {
      const ids = new Set([executionAsyncId()]);

      let nextIsBackground = false;

      const finish = id => {
        if (!ids.has(id)) {
          if (nextIsBackground) {
            nextIsBackground = false;
            options.onBackground?.();
          }
          return;
        }

        ids.delete(id);
        if (ids.size) {
          nextIsBackground = true;
          return;
        }
        hook.disable();
        options.onComplete?.();
      };
      const hook = createHook({
        init(id, type, triggerId) {
          // log({ on: "init", id, triggerId, type });
          if (ids.has(triggerId)) {
            ids.add(id);
          }
        },
        before(id) {
          // log({ on: "before", id });
          if (!ids.has(id)) return;
          if (!nextIsBackground) {
            options.onForegorund?.();
          }
        },
        after(id) {
          // log({ on: "after", id });
          finish(id);
        },
        promiseResolve(id) {
          // log({ on: "promiseResolve", id });
          finish(id);
        },
      });

      hook.enable();
      Promise.resolve(callback()).then(resolve, reject);
    });
  });
}
