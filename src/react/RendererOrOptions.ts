import { Renderer } from "./renderer";

export type RendererOrOptions<
  P extends object,
  O extends object,
  U extends any[] = []
> =
  | Renderer<P, U>
  | (O & {
      render?: Renderer<P, U>;
    });

export function RendererOrOptions<
  P extends object,
  O extends object,
  U extends any[] = []
>(
  renderOrOptions: RendererOrOptions<P, O, U> | undefined,
  defaultRenderer: Renderer<P, U>
): [renderer: Renderer<P, U>, options: O | undefined] {
  if (typeof renderOrOptions == "function") {
    return [renderOrOptions, undefined];
  }
  return [defaultRenderer, renderOrOptions];
}
