export type TypeRef<K extends PropertyKey> = K extends keyof TypeRefs
  ? TypeRefs[K]
  : never;

declare global {
  interface TypeRefs {}
}

export function TypeRef<K extends PropertyKey>(
  cb: () => K
): K extends keyof TypeRefs ? TypeRefs[K] : never {
  return <any>(() => {
    throw new Error();
  });
}
