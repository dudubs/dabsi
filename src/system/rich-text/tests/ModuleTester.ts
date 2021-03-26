import { Tester } from "@dabsi/jasmine/Tester";
import CliModule from "@dabsi/modules/CliModule";
import { Resolver, ResolverMap } from "@dabsi/typedi";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";

export default function ModuleTester() {
  return Tester.beforeAll(async () => {
    const moduleRunner = new ModuleRunner();
    moduleRunner.getInstance(CliModule);

    return {
      moduleRunner,
      context: moduleRunner.context,
      provide(...args: any[]) {
        Resolver.Context.provide(moduleRunner.context, ...args);
      },
      resolve<T>(resolver: Resolver<T>): T {
        return Resolver.resolve(resolver, moduleRunner.context);
      },
    };
  });
}
