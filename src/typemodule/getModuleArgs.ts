import { CallStackAnchor } from "@dabsi/common/CallStackAnchor";
import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import { ModuleOptions } from "@dabsi/typemodule/ModuleMetadata";
import { ModuleTarget } from "@dabsi/typemodule/ModuleRunner";

export default WeakMapFactory((target: ModuleTarget) => {
  return {
    anchor: null as null | CallStackAnchor,
    dependecies: new Set<ModuleTarget>(),
    options: {} as Omit<ModuleOptions, "dependecies">,

    methodPluginMap: new Map<string, Set<number>>(),

    propertyPlugins: new Set<string>(),
  };
});
