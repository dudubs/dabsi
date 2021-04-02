import { values } from "@dabsi/common/object/values";
import { LoaderModule2 } from "@dabsi/modules2/LoaderModule2";
import { RequestModule2 } from "@dabsi/modules2/RequestModule2";
import { CliCommand } from "@dabsi/typecli";
import { CliModule2 } from "@dabsi/typecli/CliModule";
import { Resolver } from "@dabsi/typedi";
import { Module, Plugin } from "@dabsi/typemodule";
import { ModuleRunner } from "@dabsi/typemodule/ModuleRunner";
import { join } from "path";
import {
  Connection,
  ConnectionOptions,
  createConnection,
  getMetadataArgsStorage,
  QueryRunner,
} from "typeorm";
import { findEntityTypes } from "./findEntityTypes";

export class DbQueryRunner extends Resolver<QueryRunner>() {}

@Module({
  cli: "db",
})
export class DbModule2 {
  protected _maybeEntityTypes = new Set<Function>();

  readonly log = log.get("db");

  connectionOptions: ConnectionOptions | null = null;

  @CliCommand("sync", y => y.boolean(["force", "f"])) sync({
    f,
    force = f || false,
  }) {
    //
  }

  getEntityTypes(): Function[] {
    return findEntityTypes(
      getMetadataArgsStorage()
        .tables.toSeq()
        .filter(tableArg => typeof tableArg.target === "function")
        .map(tableArg => tableArg.target as Function)
        .filter(target => this._maybeEntityTypes.has(target))
        .toSet()
    );
  }

  createConnection() {
    return createConnection({
      logging: ["schema"],
      ...(this.connectionOptions || {
        name: "default",
        type: "sqlite",
        database: "./bundle/db.sqlite3",
      }),
      entities: this.getEntityTypes(),
    });
  }

  installRequest(
    @Plugin()
    requestModule: RequestModule2
  ) {
    requestModule.requestInitalizers.push(
      Resolver([Connection, c => c], async (connection, context) => {
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();

        Resolver.Context.assign(
          context,
          Resolver(DbQueryRunner, () => queryRunner)
        );
      })
    );

    requestModule.requestFinaliziers.push(
      Resolver([DbQueryRunner], async queryRunner => {
        await queryRunner.release();
      })
    );
  }

  installCli(
    @Plugin()
    cliModule: CliModule2,
    moduleRunner: ModuleRunner
  ) {
    cliModule.wrappers.push(async execute => {
      const connection = await createConnection();

      Resolver.Context.assign(
        moduleRunner.context,
        Connection.provide(() => connection)
      );

      await execute();
    });
  }

  installLoader(
    @Plugin()
    loaderModule: LoaderModule2
  ) {
    loaderModule.pushLoader(async dir => {
      const entitiesDir = join(dir, "entities");

      for (const baseName of await loaderModule
        .readDir(entitiesDir)
        .catch(() => [])) {
        const modulePath = join(entitiesDir, baseName);

        for (const value of values(require(modulePath))) {
          if (typeof value !== "function") continue;
          this._maybeEntityTypes.add(value);
        }
      }
    });
  }
}
