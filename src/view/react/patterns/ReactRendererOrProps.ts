import { Renderer } from "../renderer";

export type ReactRendererOrProps<
  P extends object,
  O extends object,
  U extends any[] = []
> =
  | Renderer<P, U>
  | (O & {
      render?: Renderer<P, U>;
    });

export function ReactRendererOrProps<
  P extends object,
  O extends object,
  U extends any[] = []
>(
  ReactRendererOrProps: ReactRendererOrProps<P, O, U> | undefined,
  defaultRenderer: Renderer<P, U>
): [renderer: Renderer<P, U>, options: O | undefined] {
  if (typeof ReactRendererOrProps == "function") {
    return [ReactRendererOrProps, undefined];
  }
  return [
    ReactRendererOrProps?.render || defaultRenderer,
    ReactRendererOrProps,
  ];
}
