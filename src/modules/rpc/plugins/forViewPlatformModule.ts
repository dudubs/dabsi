import { values } from "@dabsi/common/object/values";
import { inspect } from "@dabsi/logging/inspect";
import LoaderModule from "@dabsi/modules/LoaderModule";
import RpcModule from "@dabsi/modules/rpc";
import { ViewPlatformModule } from "@dabsi/modules/ViewPlatformModule";
import { Module } from "@dabsi/typedi";

@Module()
export default class RpcForViewPlatofrmModule {
  constructor(
    rpcModule: RpcModule,
    loaderModule: LoaderModule,
    viewPlatformModule: ViewPlatformModule
  ) {
    loaderModule.loaders.push(async () => {
      for (const info of rpcModule.loadedConfigs) {
        rpcModule.log.trace(
          () => `Find index file for ${inspect(info.resolver)}.`
        );

        const { filename: rpcIndexFile } =
          info.nodeModule.children.find(child => {
            if (/[\\\/]node_modules[\\\/]/.test(child.filename)) return false;

            if (typeof child.exports !== "object") return false;

            for (const exported of values(child.exports)) {
              if (exported === info.resolver.rpc) {
                return true;
              }
            }

            return false;
          }) || {};

        if (!rpcIndexFile) {
          rpcModule.log.trace(
            () =>
              `No found rpc file for ${info.resolver} at "${info.nodeModule.filename}".`
          );
          continue;
        }
        rpcModule.log.trace(() => `Include index file "${rpcIndexFile}".`);
        viewPlatformModule.indexFiles.add(rpcIndexFile);
      }
    });
  }
}
