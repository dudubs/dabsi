import { ReactElement } from "react";

export function Hook<T>({
  children,
  context,
}: {
  children: (context: T) => ReactElement;
  context: () => T;
}): ReactElement {
  return children(context());
}
