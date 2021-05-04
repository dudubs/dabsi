import { defined } from "@dabsi/common/object/defined";
import { values } from "@dabsi/common/object/values";
import { Once } from "@dabsi/common/patterns/Once";
import { LoaderModule2 } from "@dabsi/modules2/LoaderModule2";
import { ServerModule2 } from "@dabsi/modules2/ServerModule2";
import { CliArgument, CliCommand } from "@dabsi/typecli";
import { CliModule2 } from "@dabsi/typecli/CliModule";
import { Resolver } from "@dabsi/typedi";
import { Module, Plugin } from "@dabsi/typemodule";
import {
  ModuleRunner,
  ModuleRunnerContext,
} from "@dabsi/typemodule/ModuleRunner";
import { join } from "path";
import {
  Connection,
  ConnectionOptions,
  createConnection,
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
    moduleRunner: ModuleRunner
  ) {
    Resolver.Context.assign(
      moduleRunner.context,
      Resolver(DbConnectionRef, () => {
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

  installServer(@Plugin() server: ServerModule2) {
    server.starters.push(() => this.loadAndConnect());

    server.request.initializers.push(
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

    server.request.finalizers.push(
      Resolver([DbQueryRunnerRef], getQueryRunner => async () => {
        await getQueryRunner().release();
      })
    );
  }

  protected _didLoad = false;
  protected _didConnect = false;

  @Once()
  async load() {
    await Promise.all(
      this.loaderModule.getLoadedDirectories().map(async dir => {
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
      })
    );
    Object.seal(this.entityTypes);
  }

  @Once()
  async connect() {
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

  @CliArgument()
  async loadAndConnect() {
    await this.load();
    await this.connect();
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
