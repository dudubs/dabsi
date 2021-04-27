import { defined } from "@dabsi/common/object/defined";
import { values } from "@dabsi/common/object/values";
import { Once } from "@dabsi/common/patterns/Once";
import { LoaderModule2 } from "@dabsi/modules2/LoaderModule2";
import { ServerRequestBuilder } from "@dabsi/modules2/ServerModule2";
import { CliCommand } from "@dabsi/typecli";
import { Resolver } from "@dabsi/typedi";
import { Module, Plugin } from "@dabsi/typemodule";
import { ModuleRunnerContext } from "@dabsi/typemodule/ModuleRunner";
import { join } from "path";
import {
  Connection,
  ConnectionOptions,
  createConnection,
  getMetadataArgsStorage,
  QueryRunner,
} from "typeorm";
import { findEntityTypes } from "./findEntityTypes";

export class DbQueryRunnerRef extends Resolver<() => QueryRunner>() {}

export class DbConnectionRef extends Resolver<() => Connection>() {}

@Module({
  cli: "db",
})
export class DbModule2 {
  protected _maybeEntityTypes = new Set<Function>();

  readonly log = log.get("DB");

  connectionOptions: ConnectionOptions | null = null;

  protected _connection: Connection | null = null;

  readonly entityTypes: Function[] = [];

  constructor(protected loaderModule: LoaderModule2) {}

  installContext(
    @Plugin()
    context: ModuleRunnerContext
  ) {
    Resolver.Context.assign(
      context,
      Resolver(DbConnectionRef, () => {
        !this._connection && this.loadAndConnect();
        return () => defined(this._connection, () => "No DB connection");
      }),
      Resolver(DbQueryRunnerRef, [DbConnectionRef], getConnection => () =>
        getConnection().createQueryRunner()
      )
    );
  }

  findEntityTypes(): Function[] {
    return findEntityTypes([...this._maybeEntityTypes, ...this.entityTypes]);
  }

  installRequest(
    @Plugin()
    request: ServerRequestBuilder
  ) {
    request.initializers.push(
      Resolver(
        [c => c, DbConnectionRef],
        (context, getConnection) => async () => {
          const queryRunner = getConnection().createQueryRunner();
          await queryRunner.connect();

          Resolver.Context.assign(
            context,
            Resolver(DbQueryRunnerRef, () => () => queryRunner)
          );
        }
      )
    );

    request.finalizers.push(
      Resolver([DbQueryRunnerRef], getQueryRunner => async () => {
        await getQueryRunner().release();
      })
    );
  }

  @Once()
  loadAndConnect() {
    this.loaderModule.pushLoader(
      () => this.constructor.name,
      async dir => {
        if (this._connection) {
          throw new Error(`Can't load module entities after connection.`);
        }
        const entitiesDir = join(dir, "entities");
        for (const baseName of await this.loaderModule
          .readDir(entitiesDir)
          .catch(() => [])) {
          const modulePath = join(entitiesDir, baseName);

          for (const value of values(require(modulePath))) {
            if (typeof value !== "function") continue;
            this._maybeEntityTypes.add(value);
          }
        }
      },
      async () => {
        Object.seal(this.entityTypes);
        this._connection = await createConnection({
          logging: ["schema"],
          ...(this.connectionOptions || {
            type: "sqlite",
            database: "./bundle/db.sqlite3",
          }),
          name: "default",
          entities: this.findEntityTypes(),
        });
      }
    );
  }

  @CliCommand("sync", y =>
    y.option("force", { type: "boolean", default: false, alias: "f" })
  )
  async sync({ force }, getConnection: DbConnectionRef) {
    const connection = getConnection();
    if (force) {
      await connection.query(`PRAGMA foreign_keys = OFF;`);
    }
    await connection.synchronize();
  }
}
