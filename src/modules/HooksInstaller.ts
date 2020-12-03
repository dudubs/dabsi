import { isPromiseLike } from "../common/async/isPromiseLike";
import { pushHook } from "../common/async/pushHook";
import { entries } from "../common/object/entries";
import { keys } from "../common/object/keys";
import { Fn } from "../common/typings2/Fn";

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

export function HooksInstaller<T extends Record<string, Fn>, U = void>(
  hooks: T,
  back?: U
): (
  options: {
    [K in keyof T]?;
  }
) => U {
  const hookMap: Record<
    string,
    {
      before: Fn[];
      after: Fn[];
    }
  > = {};

  for (const key of keys(hooks)) {
    const { before, after } = (hookMap[key] = {
      before: [] as Fn[],
      after: [] as Fn[],
    });

    const original = hooks[key];
    (hooks as any)[key] = (...args): any => {
      let originalResult;
      const result = _invoke(
        [
          () => _invoke(before, 0, args, 1),
          () => (originalResult = original(...args)),
          () => _invoke(after, after.length - 1, args, -1),
        ],
        0,
        [],
        1
      );
      return isPromiseLike(result)
        ? Promise.resolve(result).then(() => originalResult)
        : originalResult;
    };
  }

  return (
    options: {
      [K in string & keyof T]?:
        | T[K]
        | {
            after?: T[K];
            before?: T[K];
          };
    }
  ) => {
    for (const [key, option] of entries(options)) {
      if (typeof option === "function") {
        hookMap[key].before.push(option);
      } else {
        for (const when of ["after", "before"]) {
          const callback = option![when];
          callback && hookMap[key][when].push(callback);
        }
      }
    }
    return back as U;
  };
}
