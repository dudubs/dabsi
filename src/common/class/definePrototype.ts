import { Type } from "@dabsi/common/typings2/Type";

export default function <T, K extends keyof T>(
  base: Type<T>,
  props: ThisType<T> & Pick<T, K>
): void {
  Object.defineProperties(
    base.prototype,
    Object.getOwnPropertyDescriptors(props)
  );
}
