import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import { defined } from "@dabsi/common/object/defined";
import { CallStackAnchor } from "@dabsi/typedi/CallStackAnchor";
import { ModuleTarget } from "@dabsi/typemodule/ModuleRunner";

export interface BaseModuleOptions {
  dependencies?: ModuleTarget[];
}

export interface ModuleOptions extends BaseModuleOptions {}

export class ModuleMetadata {
  static touch = WeakMapFactory(
    (target: ModuleTarget) => new ModuleMetadata(target)
  );

  static get(target: ModuleTarget) {
    return defined(
      this.touch(target, true),
      () => `Invalid module type "${target.name}".`
    );
  }

  readonly options: Omit<ModuleOptions, keyof BaseModuleOptions> = {};

  readonly dependencies = new Set<ModuleTarget>();

  anchor!: CallStackAnchor;

  readonly pluginParamIndexesMap = new Map<string, Set<number>>();

  constructor(public readonly target: ModuleTarget) {}
}
