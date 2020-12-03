import { Connection, ConnectionOptions, createConnection } from "typeorm";
import { Lazy } from "../../common/patterns/lazy";
import { Cli } from "../../modules/Cli";
import { ServerModule } from "../../modules/ServerModule";
import { Inject, Module, ModuleProvider, Resolver } from "../../typedi";
import { Consumer } from "../../typedi/Consumer";
import { ModuleRunner } from "../../typedi/ModuleRunner";

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

  entities: Function[] = [];

  getConnection = (): Connection => {
    if (!this.connection) throw new Error(`No db connection`);
    return this.connection;
  };

  constructor(
    @Inject() cli: Cli,
    @Inject() mServer: ServerModule,
    @Inject() mRunner: ModuleRunner
  ) {
    cli.command("db", this.cli);
    mServer.cli.install({
      run: () => this.init(),
    });
    Resolver.provide(
      mRunner.context,
      Connection.provide(() => this.connection)
    );
  }

  protected async sync({ force }) {
    await this.init();
    if (force) {
      await this.connection.query(`PRAGMA foreign_keys = OFF;`);
    }
    await this.connection.synchronize();
  }

  connectionOptions: ConnectionOptions | null = null;

  @Lazy()
  async init() {
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
          ...this.entities,
        ]),
      ],
    });
  }
}

/*

@DbProvider({})

 */
export function DbModuleProvider({
  entities,
}: {
  entities?: Function[];
}): ModuleProvider {
  return Consumer([DbModule], dbModule => {
    entities && dbModule.entities.push(...entities);
    return {};
  });
}
