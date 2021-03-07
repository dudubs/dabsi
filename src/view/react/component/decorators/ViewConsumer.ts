import methodHook from "@dabsi/common/class/methodHook";
import EmptyFragment from "@dabsi/view/react/utils/EmptyFragment";
import React from "react";

function ViewHook({ callback, hook }) {
  callback(hook());
  return EmptyFragment;
}

export function ViewConsumer<T>(
  context: React.Context<T>
): <K extends string>(target: Record<K, T>, propertyName: K) => void;

export function ViewConsumer<T>(
  hook: () => T
): <K extends string>(target: Record<K, T>, propertyName: K) => void;
export function ViewConsumer(contextOrHook) {
  return (
    target: {
      render(): React.ReactElement;
    },
    propertyName
  ) => {
    const map = new WeakMap();
    Object.defineProperty(target, propertyName, {
      get() {
        if (!map.has(this)) {
          throw new Error(`Can't access "${propertyName}" before first render`);
        }
        return map.get(this);
      },
    });

    methodHook(
      target,
      "render",
      originalRender =>
        function () {
          return React.createElement(
            React.Fragment,
            null,
            typeof contextOrHook === "function"
              ? React.createElement(ViewHook, {
                  hook: contextOrHook,
                  callback: value => {
                    map.set(this, value);
                  },
                })
              : React.createElement(contextOrHook.Consumer, {
                  children: value => {
                    map.set(this, value);
                    return EmptyFragment;
                  },
                }),
            originalRender.call(this)
          );
        }
    );
  };
}
