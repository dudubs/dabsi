import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import { Constructor } from "@dabsi/common/typings2/Constructor";
import { CallStackAnchor } from "@dabsi/typedi/CallStackAnchor";

export type ModuleTarget = Constructor<any>;

const moduleMetadataMap = new WeakMap<ModuleTarget, OldModuleMetadata2>();

export class OldModuleMetadata2 {
  dependencies: ModuleTarget[] = [];
  plugins: ModuleTarget[] = [];
  anchor!: CallStackAnchor;

  constructor(public target: ModuleTarget) {}

  register(anchor: CallStackAnchor) {
    this.anchor = anchor;
  }

  static get = WeakMapFactory((target: ModuleTarget) =>
    moduleMetadataMap.touch(target, () => new OldModuleMetadata2(target))
  );
}

export function isModuleTarget(obj): obj is ModuleTarget {
  return moduleMetadataMap.has(obj);
}
