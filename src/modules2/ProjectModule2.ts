import { AsyncProcess2 } from "@dabsi/common/async/AsyncProcess2";
import { RpcModule2 } from "@dabsi/modules/rpc";
import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import { RpcResolverBuilder } from "@dabsi/modules/rpc/RpcResolverBuilder";
import { LoaderModule2 } from "@dabsi/modules2/LoaderModule2";
import { ServerModule2 } from "@dabsi/modules2/ServerModule2";
import { Inject, Resolver } from "@dabsi/typedi";
import { Module } from "@dabsi/typemodule";
import { TsConfigPaths2 } from "@dabsi/typestack/TsConfigPaths2";
import path from "path";

export class ProjectSettings {
  constructor(readonly directory: string) {}
}

@Module()
export class ProjectModule2 {
  //

  readonly paths = new TsConfigPaths2({
    isDir: path => this.loaderModule.isDir(path),
    isFile: path => this.loaderModule.isFile(path),
    readJsonFile: async path => this.loaderModule.readJsonFile(path),
  });

  constructor(
    protected loaderModule: LoaderModule2,
    process: AsyncProcess2,

    public readonly settings: ProjectSettings
  ) {
    process.push(
      () => `${this.constructor.name}.Loader`,
      async () => {
        await this.paths.load(
          path.join(this.settings.directory, "tsconfig.json")
        );
      }
    );
  }
}

ServerModule2.defineServerLoader(
  (RpcResolver as any) as RpcResolver<any>,
  rpcResolver => {
    return Resolver([RpcResolverBuilder], rb => {
      rb.add(rpcResolver);
    });
  }
);
