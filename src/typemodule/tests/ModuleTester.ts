import Lazy from "@dabsi/common/patterns/Lazy";
import { SingleCall } from "@dabsi/common/patterns/SingleCall";
import { Constructor } from "@dabsi/common/typings2/Constructor";
import { Tester } from "@dabsi/jasmine/Tester";
import { Resolver, ResolverMap } from "@dabsi/typedi";
import { ModuleRunner, ModuleTarget } from "@dabsi/typemodule/ModuleRunner";

export type ModuleTester = ReturnType<typeof ModuleTester>;

export function ModuleTester(resolvers: Resolver[] = []) {
  return Tester.beforeAll(async t => {
    const moduleRunner = new ModuleRunner();

    for (const resolver of resolvers || []) {
      await Resolver.resolve(resolver, moduleRunner.context);
    }

    // beforeWait
    await moduleRunner.process.wait();
    // afterWait
    return {
      moduleRunner,
      resolve<T>(resolver: Resolver<T>): T {
        return Resolver.resolve(resolver, moduleRunner.context);
      },
      getAndWait: async <T>(target: Constructor<T>): Promise<T> => {
        const instance = moduleRunner.get(target);
        await moduleRunner.process.wait();
        return instance;
      },
      wait() {
        return moduleRunner.process.wait();
      },
      provide(...args) {
        Resolver.Context.assign(moduleRunner.context, ...args);
      },
    };
  });
}

ModuleTester.default = SingleCall(() => ModuleTester());
