import React, { ComponentType, Ref, useEffect, useMemo } from "react";

export type RefType<T extends React.Ref<any>> = T extends React.Ref<infer U>
  ? U
  : never;

export function useUpdateRef<T extends Ref<any> | undefined>(
  ref: T,
  create: () => RefType<NonNullable<T>>
) {
  useEffect(() => {
    ref && updateRef(ref, create());
    return () => {
      ref && updateRef(ref, null);
    };
  }, [typeof (ref || undefined)]);
}

export function updateRef<T>(ref: React.Ref<T> | undefined, value: T) {
  if (ref)
    switch (typeof ref) {
      case "function":
        return ref(value);
      case "object":
        // @ts-expect-error
        ref["current"] = value;
    }
}

export type HookRef<T> = { hookRef?: React.Ref<T> };
export type ForwardHookRef<T extends ComponentType<HookRef<any>>> = HookRef<
  HookRefType<T>
>;

export type HookRefType<
  T extends ComponentType<HookRef<any>>
> = T extends ComponentType<HookRef<infer U>> ? U : never;

export function useHookRef<T extends ComponentType<HookRef<any>>>(
  componentType?: T
): {
  readonly current: HookRefType<T>;
  (current: HookRefType<T>): void;
} {
  return useMemo(() => {
    hookRef.current = undefined;
    return hookRef;

    function hookRef(current) {
      hookRef.current = current;
    }
  }, []);
}
