import { Merger } from "@dabsi/common/object/Merger";

type Callback = ((...args) => void) | undefined;
export const mergeCallback = Merger<Callback>((left, right) => {
  if (!left) return right;
  if (!right) return left;
  return (...args) => {
    left(...args);
    right(...args);
  };
});
