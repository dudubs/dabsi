import Lazy from "@dabsi/common/patterns/Lazy";
import { Awaitable } from "@dabsi/common/typings2/Async";
import DataContext from "@dabsi/modules/data/DataContext";
import SystemTestsModule from "@dabsi/system/core/SystemTestsModule";
import { Resolver, ResolverMap } from "@dabsi/typedi";

declare global {
  interface ISystemTests {}
}

interface SystemTests extends ISystemTests {}

class SystemTests {
  module!: SystemTestsModule;

  get context(): ResolverMap {
    return this.module.moduleRunner.context;
  }

  @Lazy() get data(): DataContext {
    return Resolver.resolve(DataContext, this.context);
  }

  readonly onBuild: (() => Awaitable)[] = [];

  readonly onRun: (() => Awaitable)[] = [];
}

export default new SystemTests();
