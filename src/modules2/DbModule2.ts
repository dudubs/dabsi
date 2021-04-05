import { AsyncProcess } from "@dabsi/common/async/AsyncProcess";
import { values } from "@dabsi/common/object/values";
import { Defined } from "@dabsi/common/patterns/Defined";
import Lazy from "@dabsi/common/patterns/Lazy";
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
export class DbConnectionRef extends Resolver<() => Connection>() {}

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

  protected _connection: Connection | null = null;

  constructor(moduleRunner: ModuleRunner) {
    Resolver.Context.assign(
      moduleRunner.context,
      Resolver(DbConnectionRef, () => {
        if (!this._connection) {
          moduleRunner.process.push(
            () => `Connecting
            
            
            
            
            
            `,
            this._connectionPromise.then(connection => {
              this._connection = connection;
            })
          );
        }

        return () => this._connection!;
      })
    );
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

  @Lazy() protected get _connectionPromise(): Promise<Connection> {
    return this.createConnection();
  }

  installCli(
    @Plugin()
    cliModule: CliModule2,
    moduleRunner: ModuleRunner,
    process: AsyncProcess
  ) {
    let connectionRef = {};

    Resolver.Context.assign(
      moduleRunner.context,
      Resolver(DbConnectionRef, () => {
        process.push(() => `connect to `, this._connectionPromise);

        return connectionRef;
      })
    );

    // Resolver.async(Connection, ()=> promise)
    // TODO: push to process for wait connection
    cliModule.extend({
      wrapper: (args, execute) => {
        return execute();
      },
    });
    cliModule.builders.push(builder => {
      builder.wrappers.push(async (args, execute) => {
        await execute();
      });
    });
  }

  installLoader(
    @Plugin()
    loaderModule: LoaderModule2
  ) {
    loaderModule.pushLoader(
      () => `${this.constructor.name}.Loader`,
      async dir => {
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
      }
    );
  }
}
