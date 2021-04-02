import { defined } from "@dabsi/common/object/defined";
import { CallStackAnchor } from "@dabsi/typedi/CallStackAnchor";
import { Injectable } from "@dabsi/typedi/decorators/Injectable";
import { Resolver } from "@dabsi/typedi/index";
import { OldModuleRunner as ModuleRunner } from "@dabsi/typedi/OldModuleRunner";
import { OldModuleMetadata2, ModuleTarget } from "../OldModuleMetadata2";

let lastDecoratedModule: ModuleTarget | null = null;

export const getLastDecoratedModule = (): ModuleTarget =>
  defined(lastDecoratedModule, `No last decorated module.`);

export type ModuleMetadata = {
  anchor: CallStackAnchor;
  dependencies: ModuleTarget[];
  plugins: ModuleTarget[];
};

export const moduleMetadataMap = new WeakMap<ModuleTarget, ModuleMetadata>();

export type ModuleOptions = {
  dependencies?: ModuleTarget[];
  plugins?: ModuleTarget[];
};

export function Module(options: ModuleOptions = {}) {
  const anchor = CallStackAnchor.capture(Module);
  return (target: ModuleTarget) => {
    lastDecoratedModule = target;

    OldModuleMetadata2.get(target).register(anchor);

    moduleMetadataMap.set(target, {
      dependencies: [],
      plugins: [],
      ...options,
      anchor,
    });

    Injectable()(target);

    Object.defineProperty(target, Resolver.resolveSymbol, {
      configurable: false,
      value(context) {
        return Resolver.resolve(ModuleRunner, context).getInstance(this);
      },
    });

    target[Resolver.checkSymbol] = function (context) {
      Resolver.check(ModuleRunner, context);
    };
  };
}

export namespace Module {}
