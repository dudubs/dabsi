import { Awaitable } from "@dabsi/common/typings2/Async";

const rejection = Symbol("rejection");

export type Rejected<V, E> = { [rejection]: { id: number; error: E } };

export type Rejectable<V, R, E> = (
  value: V,
  reject: (error: E) => Rejected<V, E>
) => Awaitable<R | Rejected<V, E>>;

let counter = 0;

export async function Rejectable<V, R, E>(
  rejectable: Rejectable<V, R, E>,
  value: V
): Promise<{ error: E } | { value: V }>;

export async function Rejectable(rejectable, value) {
  const id = counter++;
  const result = await rejectable(value, error => ({
    [rejection]: { id, error },
  }));
  if (typeof result === "object" && result?.[rejection]?.id === id) {
    return { error: result[rejection].error };
  }
  return { value: result };
}
