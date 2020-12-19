import { isConstructor } from "@dabsi/common/object/isConstructor";
import { touchSet } from "@dabsi/common/map/touchSet";
import { values } from "@dabsi/common/object/values";
import { Once } from "@dabsi/common/patterns/Once";
import { Cli } from "@dabsi/modules/Cli";
import { ServerModule } from "@dabsi/modules/ServerModule";
import { Inject, Module, ModuleProvider, Resolver } from "@dabsi/typedi";
import { Consumer } from "@dabsi/typedi/Consumer";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";
import ProjectManager from "@dabsi/typestack/ProjectManager";
import { readdirSync } from "fs";
import path from "path";
import {
  Connection,
  ConnectionOptions,
  createConnection,
  getMetadataArgsStorage,
} from "typeorm";

@Module({})
export class DbModule {
  log = log.get("DB");

  cli = new Cli().command(
    "sync",
    new Cli().install({
      build: y => y.boolean("force"),
      run: args => this.sync(args),
    })
  );

  protected connection: Connection;

  entityTypes = new Set<Function>();

  getConnection = (): Connection => {
    if (!this.connection) throw new Error(`No db connection`);
    return this.connection;
  };

  constructor(
    @Inject() cli: Cli,
    @Inject() serverModule: ServerModule,
    @Inject() runner: ModuleRunner,
    @Inject() protected projectManager: ProjectManager
  ) {
    cli.command("db", this.cli);
    serverModule.cli.install({
      run: () => this.init(),
    });
    Resolver.provide(
      runner.context,
      Connection.provide(() => this.connection)
    );
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

  protected async _load() {
    for (const projectModule of this.projectManager.allProjectModules) {
      const {
        entities: entitiesDir,
        ["entities.ts"]: entitiesFile,
      } = projectModule.fileMap;
      if (entitiesDir?.stat.isDirectory()) {
        for (const baseName of readdirSync(entitiesDir.fileName)) {
          if (baseName.endsWith(".ts")) {
            await this._loadEntityModule(
              path.join(entitiesDir.fileName, baseName)
            );
          }
        }
      } else if (entitiesFile?.stat.isFile()) {
        await this._loadEntityModule(entitiesFile.fileName);
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

  @Once()
  async init() {
    await this.projectManager.init();
    await this._load();
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
  }
}

/*

@DbProvider({})

 */

function isEntityType(target) {
  return (
    typeof target === "function" &&
    getMetadataArgsStorage().tables.find(x => x.target === target)
  );
}
