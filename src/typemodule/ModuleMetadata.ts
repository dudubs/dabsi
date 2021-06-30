import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import Lazy from "@dabsi/common/patterns/Lazy";
import getModuleArgs from "@dabsi/typemodule/getModuleArgs";
import { ModuleTarget } from "@dabsi/typemodule/ModuleRunner";
import path from "path";

export interface BaseModuleOptions {
  dependencies?: ModuleTarget[];
}

declare global {
  namespace TypeModule {
    interface IModuleOptions {}
  }
}

export interface ModuleOptions
  extends BaseModuleOptions,
    TypeModule.IModuleOptions {}

const map = new WeakMap();

export default class ModuleMetadata {
  static touch = WeakMapFactory(
    (target: ModuleTarget) => new ModuleMetadata(target)
  );

  static get(target: ModuleTarget): ModuleMetadata {
    return map.touch(target, () => new ModuleMetadata(target));
  }

  readonly args = getModuleArgs(this.target);

  get fileName(): string {
    return this.args.anchor!.path;
  }

  @Lazy() get baseName(): string {
    return path.basename(this.fileName);
  }

  @Lazy() get directory(): string {
    return path.dirname(this.fileName);
  }

  constructor(public readonly target: ModuleTarget) {
    if (!this.args.anchor) {
      throw new Error(
        `Invalid moduleType ${target.name}, did you used @Module() decorator?`
      );
    }
  }
}
