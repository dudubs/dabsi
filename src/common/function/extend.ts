import { Constructor } from "@dabsi/common/typings2/Constructor";

export default function extend<T extends Constructor, P extends object>(
  base: T,
  props: ThisType<InstanceType<T>> & P
): Constructor<P> {
  Object.defineProperties(
    base.prototype,
    Object.getOwnPropertyDescriptors(props)
  );
  return <any>function () {
    throw new Error("TypeOnly");
  };
}
