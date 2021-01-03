import { isPromiseLike } from "@dabsi/common/async/isPromiseLike";
import { Timeout } from "@dabsi/common/async/Timeout";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { Fn } from "@dabsi/common/typings2/Fn";

function _concat(result, callback) {
  if (isPromiseLike(result)) {
    return Promise.resolve(result).then(() => callback());
  }
  return callback();
}
function _invokeInOrder(callbacks, args) {
  return _invoke(callbacks, args, 1, 0);
}
function _invokeReveresed(callbacks, args) {
  return _invoke(callbacks, args, -1, callbacks.length - 1);
}

function _invoke(callbacks, args, direction, index) {
  const callback = callbacks[index];
  return (
    callback &&
    _concat(callback(...args), () =>
      _invoke(callbacks, args, direction, index + direction)
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
    return _concat(
      _invokeInOrder(
        [
          () => _invokeInOrder(beforeCallbacks, args),
          () => (result = original?.(...args)),
          () => _invokeReveresed(afterCallbacks, args),
        ],
        []
      ),
      () => result
    );
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
