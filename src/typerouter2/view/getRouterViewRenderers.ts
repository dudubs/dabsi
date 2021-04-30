import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import { RouterType } from "@dabsi/typerouter2/Router";
import { RouterViewRenderer } from "@dabsi/typerouter2/view/RouterView";

export const getRouterViewRenderers = WeakMapFactory((target: RouterType) => {
  return {
    wrappers: [] as RouterViewRenderer<any, any>[],
    index: [] as RouterViewRenderer<any, any>[],
  };
});
