export function flat<T>(
  root: T,
  flatter: Flatter<T>,
  type: FlatType = "before"
): IterableIterator<T> {
  return FlatTypes[type](root, flatter, type);
}
export type Flatter<T> = (root: T) => Iterable<T>;

export function Flatter<T, U>(create: (root: T) => U, flatter: Flatter<U>) {
  return (root: T, type: FlatType = "before") => {
    return flat(create(root), flatter);
  };
}

export type FlatType = keyof typeof FlatTypes;

namespace FlatTypes {
  export function* before(root, flatter: Flatter<any>, type: FlatType) {
    yield root;
    for (const child of flatter(root)) {
      yield* flat(child, flatter, type);
    }
  }
  export function* after(root, flatter: Flatter<any>, type: FlatType) {
    for (const child of flatter(root)) {
      yield* flat(child, flatter, type);
    }
    yield root;
  }
  export function* beforeInside(root, flatter: Flatter<any>, type: FlatType) {
    for (const child of flatter(root)) {
      yield child;
      yield* flat(child, flatter, type);
    }
  }
  export function* afterInside(root, flatter: Flatter<any>, type: FlatType) {
    for (const child of flatter(root)) {
      yield* flat(child, flatter, type);
      yield child;
    }
  }
}
