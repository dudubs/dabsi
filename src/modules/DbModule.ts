import { defined } from "@dabsi/common/object/defined";
import { values } from "@dabsi/common/object/values";
import { Once } from "@dabsi/common/patterns/Once";
import { Constructor } from "@dabsi/common/typings2/Constructor";
import LoaderModule from "@dabsi/modules/LoaderModule";
import ProjectModule from "@dabsi/modules/ProjectModule";
import ServerModule from "@dabsi/modules/ServerModule";
import { CliArgument, CliCommand } from "@dabsi/typecli";
import { DataEntitySource } from "@dabsi/typedata/entity/source";
import { DataSource } from "@dabsi/typedata/source";
import { Resolver } from "@dabsi/typedi";
import { Module, Plugin } from "@dabsi/typemodule";
import { ModuleRunner } from "@dabsi/typemodule/ModuleRunner";
import path, { join } from "path";
import {
  Connection,
  ConnectionOptions,
  createConnection,
  QueryRunner,
} from "typeorm";
import { findEntityTypes } from "./findEntityTypes";

export class DbQueryRunnerRef extends Resolver<() => QueryRunner>() {}

export class DbConnectionRef extends Resolver<() => Connection>() {}

export class DataSourceFactory2 extends Resolver(
  [DbQueryRunnerRef],
  getQueryRunner =>
    //
    (entityType =>
      DataEntitySource.create<any>(entityType, getQueryRunner)) as {
      <T>(entityType: Constructor<T>): DataSource<T>;
    }
) {}

@Module({
  cli: "db",
})
export default class DbModule {
  protected _maybeEntityTypes = new Set<Function>();

  readonly log = log.get("DB");

  connectionOptions: ConnectionOptions | null = null;

  protected _connection: Connection | null = null;

  readonly entityTypes: Function[] = [];

  constructor(protected loaderModule: LoaderModule) {}

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

  installServer(@Plugin() server: ServerModule) {
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

  @Plugin()
  protected _projectModule?: ProjectModule;

  @Once()
  async connect() {
    if (!this.connectionOptions) {
      if (this._projectModule) {
        this.connectionOptions = {
          type: "sqlite",
          database: path.join(this._projectModule.bundleDir, "db.sqlite3"),
        };
      }
    }

    if (!this.connectionOptions) {
      throw new Error("No connection options.");
    }

    this._connection = await createConnection({
      logging: ["schema"],
      name: "default",
      ...this.connectionOptions!,
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
  async sync({ force = false } = {}) {
    if (force) {
      await this._connection!.query(`PRAGMA foreign_keys = OFF;`);
    }
    await this._connection!.synchronize();
  }
}
