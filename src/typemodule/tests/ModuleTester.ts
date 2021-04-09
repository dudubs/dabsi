import Lazy from "@dabsi/common/patterns/Lazy";
import { Constructor } from "@dabsi/common/typings2/Constructor";
import { Tester } from "@dabsi/jasmine/Tester";
import { Resolver, ResolverMap } from "@dabsi/typedi";
import { ModuleRunner, ModuleTarget } from "@dabsi/typemodule/ModuleRunner";

export type ModuleTester = ReturnType<typeof ModuleTester>;

export function ModuleTester({
  dependencies = [],
  providers = [],
}: { dependencies?: ModuleTarget[]; providers?: ResolverMap[] } = {}) {
  return Tester.beforeAll(async () => {
    const moduleRunner = new ModuleRunner();

    Resolver.Context.assign(moduleRunner.context, ...providers);
    dependencies?.forEach(target => {
      void moduleRunner.get(target);
    });
    await moduleRunner.process.wait();
    return {
      moduleRunner,
      getAndWait: async <T>(target: Constructor<T>): Promise<T> => {
        const instance = moduleRunner.get(target);
        await moduleRunner.process.wait();
        return instance;
      },
    };
  });
}

ModuleTester.default = Lazy(() => ModuleTester());
