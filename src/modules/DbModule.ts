import { touchSet } from "@dabsi/common/map/touchSet";
import { values } from "@dabsi/common/object/values";
import Lazy from "@dabsi/common/patterns/lazy";
import { Once } from "@dabsi/common/patterns/Once";
import { Cli } from "@dabsi/modules/Cli";
import { Hookable } from "@dabsi/modules/Hookable";
import ServerModule from "@dabsi/modules/server";
import { Module, Resolver } from "@dabsi/typedi";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";
import ProjectModule from "@dabsi/typestack/ProjectModule";
import path from "path";
import {
  Connection,
  ConnectionOptions,
  createConnection,
  getMetadataArgsStorage,
  QueryRunner,
} from "typeorm";
import ProjectModuleInfo from "../typestack/ProjectModuleInfo";
import LoaderModule from "./LoaderModule";

@Module({})
export class DbModule {
  log = log.get("DB");

  protected connection!: Connection;

  entityTypes = new Set<Function>();

  getConnection = (): Connection => {
    if (!this.connection) throw new Error(`No db connection`);
    return this.connection;
  };

  constructor(
    cli: Cli,
    serverModule: ServerModule,
    runner: ModuleRunner,
    protected projectModule: ProjectModule,
    protected loaderModule: LoaderModule
  ) {
    cli.command("db", cli =>
      cli.command("sync", cli =>
        cli //
          .onBuild(y => y.boolean(["f", "force"]))
          .onRun(args => this.sync(args))
      )
    );
    serverModule.onStart(() => this.init());

    Resolver.provide(
      runner.context,
      Connection.provide(() => this.connection)
    );

    projectModule.onLoadModule(async projectModuleInfo => {
      await this._loadProjectModule(projectModuleInfo);
    });
  }

  protected _loadEntityType(entityType: Function) {
    if (!touchSet(this.entityTypes, entityType)) return;

    this.log.trace(() => `Loading entity type "${entityType.name}".`);

    getMetadataArgsStorage().relations.forEach(r => {
      if (typeof r.type !== "function") return;
      const entityType = !r.type.prototype ? r.type() : r.type;
      if (!this._allEntityTypes.has(entityType)) return;
      this._loadEntityType(entityType);
    });
  }

  @Lazy() protected get _allEntityTypes() {
    return getMetadataArgsStorage()
      .tables.toSeq()
      .map(t => t.target)
      .filter(t => typeof t === "function")
      .toSet();
  }
  protected async _loadEntityModule(moduleFileName) {
    this.log.trace(() => `Load entities file ${moduleFileName}.`);
    const moduleExports = require(moduleFileName);
    for (const target of values<Function>(moduleExports)) {
      if (this.entityTypes.has(<any>target)) continue;
      if (this._allEntityTypes.has(target)) {
        this._loadEntityType(target);
      }
    }
  }

  async _loadProjectModule(projectModuleInfo: ProjectModuleInfo) {
    const entitiesDir = path.join(projectModuleInfo.dir, "entities");

    if (await this.loaderModule.isDir(entitiesDir)) {
      for (const baseName of await this.loaderModule.readDir(entitiesDir)) {
        if (baseName.endsWith(".ts")) {
          await this._loadEntityModule(path.join(entitiesDir, baseName));
        }
      }
    }
  }

  queryRunner: QueryRunner | null = null;

  protected async sync({ f, force = f }) {
    await this.init();
    if (force) {
      await this.connection.query(`PRAGMA foreign_keys = OFF;`);
    }
    await this.connection.synchronize();
  }

  connectionOptions: ConnectionOptions | null = null;

  beforeInit = Hookable();
  afterInit = Hookable();

  @Once()
  async init() {
    await this.beforeInit.invoke();
    this.connection = await createConnection({
      logging: ["schema"],
      ...(this.connectionOptions || {
        name: "default",
        type: "sqlite",
        database: "./bundle/db.sqlite3",
      }),
      entities: [
        ...new Set([
          ...(this.connectionOptions?.entities || []),
          ...this.entityTypes,
        ]),
      ],
    });
    this.queryRunner = this.connection.createQueryRunner();
    await this.afterInit.invoke();
  }
}
