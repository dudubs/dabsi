export type Type<T> = Function & { prototype: T };

export function Type<T = any>(this: any): Type<T> {
  if (this instanceof Type) {
    throw new Error();
  }
  return Type;
}
