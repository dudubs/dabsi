import { Renderer } from "./renderer";

export type RendererOrProps<
  P extends object,
  O extends object,
  U extends any[] = []
> =
  | Renderer<P, U>
  | (O & {
      render?: Renderer<P, U>;
    });

export function RendererOrProps<
  P extends object,
  O extends object,
  U extends any[] = []
>(
  RendererOrProps: RendererOrProps<P, O, U> | undefined,
  defaultRenderer: Renderer<P, U>
): [renderer: Renderer<P, U>, options: O | undefined] {
  if (typeof RendererOrProps == "function") {
    return [RendererOrProps, undefined];
  }
  return [RendererOrProps?.render || defaultRenderer, RendererOrProps];
}
