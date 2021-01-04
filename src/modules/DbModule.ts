import { touchSet } from "@dabsi/common/map/touchSet";
import { values } from "@dabsi/common/object/values";
import { Once } from "@dabsi/common/patterns/Once";
import { Cli } from "@dabsi/modules/Cli";
import { Hookable } from "@dabsi/modules/Hookable";
import { ServerModule } from "@dabsi/modules/ServerModule";
import { Inject, Module, Resolver } from "@dabsi/typedi";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";
import ProjectModule from "@dabsi/typestack/ProjectModule";
import { readdirSync } from "fs";
import path from "path";
import {
  Connection,
  ConnectionOptions,
  createConnection,
  getMetadataArgsStorage,
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
    @Inject() cli: Cli,
    @Inject() serverModule: ServerModule,
    @Inject() runner: ModuleRunner,
    @Inject() protected projectModule: ProjectModule,
    @Inject() protected loaderModule: LoaderModule
  ) {
    cli.command("db", cli =>
      cli.command("sync", cli =>
        cli //
          .onBuild(y => y.boolean("force"))
          .onBuild(args => this.sync(args))
      )
    );
    serverModule.onStart(() => this.init());

    Resolver.provide(
      runner.context,
      Connection.provide(() => this.connection)
    );

    projectModule.onProjectModuleLoaded(async projectModuleInfo => {
      await this._loadProjectModule(projectModuleInfo);
    });
  }

  protected _loadEntityType(entityType: Function) {
    if (!touchSet(this.entityTypes, entityType)) return;

    this.log.trace(() => `Loading entity type "${entityType.name}".`);

    getMetadataArgsStorage().relations.forEach(r => {
      if (typeof r.type !== "function") return;
      const entityType = !r.type.prototype ? r.type() : r.type;
      if (!isEntityType(entityType)) return;
      this._loadEntityType(entityType);
    });
  }

  protected async _loadEntityModule(moduleFileName) {
    this.log.trace(() => `Load entities file ${moduleFileName}.`);
    const moduleExports = require(moduleFileName);
    for (const target of values<Function>(moduleExports)) {
      if (this.entityTypes.has(<any>target)) continue;
      if (isEntityType(target)) {
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

  protected async sync({ force }) {
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
    await this.afterInit.invoke();
  }
}

/*

TypeMap();
@DbProvider({})

 */

function isEntityType(target) {
  return (
    typeof target === "function" &&
    getMetadataArgsStorage().tables.find(x => x.target === target)
  );
}
