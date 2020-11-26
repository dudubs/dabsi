import { Connection, createConnection } from "typeorm";
import { Lazy } from "../../common/patterns/lazy";
import { Cli } from "../../modules/Cli";
import { Inject, Module, ModuleProvider } from "../../typedi";
import { Consumer } from "../../typedi/Consumer";

@Module({})
export class DbModule {
  cli = new Cli().connect(
    "sync",
    new Cli().push({
      build: (y) => y.boolean("force"),
      run: (args) => this.sync(args),
    })
  );

  connection: Connection;

  entities: Function[] = [];

  constructor(@Inject() cli: Cli) {
    cli.connect("db", this.cli);
  }

  protected async sync({ force }) {
    await this.init();
    if (force) {
      await this.connection.query(`PRAGMA foreign_keys = OFF;`);
    }
    await this.connection.synchronize();
  }
  @Lazy()
  async init() {
    this.connection = await createConnection({
      name: "default",
      type: "sqlite",
      logging: ["schema"],
      database: "./bundle/db.sqlite3",
      entities: [...new Set(this.entities)],
    });
  }
}

/*

@DbProvider({})

 */
export function DbModuleProvider({
  entities,
}: {
  entities: Function[];
}): ModuleProvider {
  return Consumer([DbModule], (mDb) => {
    mDb.entities.push(...entities);
    return {};
  });
}
