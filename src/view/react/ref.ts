export namespace ReactRef {
  export function merge<T>(
    ...refs: (React.Ref<T> | undefined)[]
  ): React.RefCallback<T> {
    return value => {
      for (let ref of refs) {
        update(ref, value);
      }
    };
  }
  export function update<T>(ref: React.Ref<T> | undefined, value: T) {
    if (typeof ref === "function") ref(value);
    else if (ref) {
      // @ts-ignore
      ref["current"] = value;
    }
  }

  export function isRefObject(o): o is React.RefObject<any> {
    return o && typeof o === "object" && "current" in o;
  }
}
