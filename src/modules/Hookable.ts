import { isPromiseLike } from "@dabsi/common/async/isPromiseLike";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { Fn } from "@dabsi/common/typings2/Fn";

function _concat(result, callback) {
  if (isPromiseLike(result)) {
    return Promise.resolve(result).then(() => callback());
  }
  return callback();
}

function _invoke(
  callbacks: (Fn | undefined)[],
  index: number,
  args,
  direction: 1 | -1
) {
  const callback = callbacks[index];
  return (
    callback &&
    _concat(callback(...args), () =>
      _invoke(callbacks, index + direction, args, direction)
    )
  );
}

export type Hookable<
  T extends Fn,
  Callback = (
    ...args: Parameters<T>
  ) => ReturnType<T> extends Awaitable
    ? Awaitable
    : ReturnType<T> extends Promise<any>
    ? Promise<void>
    : void
> = {
  invoke: (...args: Parameters<T>) => ReturnType<T>;

  <This>(this: This, callback: Callback): This;
  <This>(this: This, hook: { after?: Callback; before?: Callback }): This;
};

export function Hookable<T extends Fn>(original?: T): Hookable<T> {
  const beforeCallbacks = [] as Fn[];
  const afterCallbacks = [] as Fn[];

  hookable.invoke = (...args) => {
    let result;
    _invoke(
      [
        () => _invoke(beforeCallbacks, 0, args, 1),
        () => (result = original?.(...args)),
        () => _invoke(afterCallbacks, afterCallbacks.length - 1, args, -1),
      ],
      0,
      [],
      1
    );
    return result;
  };
  return <any>hookable;
  function hookable(this: any, hook) {
    if (typeof hook === "function") {
      hook = { before: hook };
    }
    hook.before && beforeCallbacks.push(hook.before);
    hook.after && afterCallbacks.push(hook.after);
    return this;
  }
}
