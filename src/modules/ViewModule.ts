import { Once } from "@dabsi/common/patterns/Once";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { Module } from "@dabsi/typedi";

@Module()
export class ViewModule {
  loaders: (() => Awaitable)[] = [];

  commonFiles!: Set<string>;

  constructor() {}

  @Once() async load() {
    this.commonFiles = new Set();
    Object.seal(this.loaders);
    for (const loader of this.loaders) {
      await loader();
    }
  }
}
