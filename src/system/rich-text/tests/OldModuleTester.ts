import { Tester } from "@dabsi/jasmine/Tester";
import CliModule from "@dabsi/modules/CliModule";
import { Resolver, ResolverMap } from "@dabsi/typedi";
import { OldModuleRunner as ModuleRunner } from "@dabsi/typedi/OldModuleRunner";

export default function OldModuleTester() {
  return Tester.beforeAll(async () => {
    const moduleRunner = new ModuleRunner();
    moduleRunner.getInstance(CliModule);

    return {
      moduleRunner,
      context: moduleRunner.context,
      provide(...args: any[]) {
        Resolver.Context.assign(moduleRunner.context, ...args);
      },
      resolve<T>(resolver: Resolver<T>): T {
        return Resolver.resolve(resolver, moduleRunner.context);
      },
    };
  });
}
