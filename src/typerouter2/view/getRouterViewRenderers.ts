import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import { RouterType } from "@dabsi/typerouter2/Router";
import { RouterViewRenderer } from "@dabsi/typerouter2/view/RouterView";

export type RouterViewRendererWithDepth = {
  renderer: RouterViewRenderer<any, any, any>;
  depth: number;
};

export const getRouterViewRenderers = WeakMapFactory((target: RouterType) => {
  return {
    wrappers: [] as RouterViewRendererWithDepth[],
    index: [] as RouterViewRendererWithDepth[],
  };
});
