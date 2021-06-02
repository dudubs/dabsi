import Lazy from "@dabsi/common/patterns/Lazy";
import DevModule from "@dabsi/modules/DevModule";
import ExpressModule from "@dabsi/modules/ExpressModule";
import ProjectModule from "@dabsi/modules/ProjectModule";
import watchOnPlatform from "@dabsi/modules/watchOnPlatform";
import { CliCommand } from "@dabsi/typecli";
import { Module, Plugin } from "@dabsi/typemodule";
import { ModuleRunner } from "@dabsi/typemodule/ModuleRunner";
import getTypestackCliArgs from "@dabsi/typestack/getTypestackCliArgs";
import { ChildProcess, spawn } from "child_process";

@Module({
  cli: "server",
})
export default class ServerDevModule {
  protected _devProcess: ChildProcess | null = null;

  readonly log = log.get("SERVER.DEV");

  constructor(
    protected projectModule: ProjectModule,
    protected moduleRunner: ModuleRunner
  ) {}
  @Lazy() get isDevChild() {
    return process.env.TS_DEV_CHILD === "true";
  }
  reload() {
    this._devProcess?.kill();
    this._devProcess = spawn(
      process.argv[0],
      getTypestackCliArgs(["server", "start"]),
      {
        stdio: "inherit",
        cwd: this.projectModule.settings.directory,
        env: { ...process.env, TS_DEV_CHILD: "true" },
      }
    );
  }

  @CliCommand("start-dev") startDev() {
    this.reload();
    watchOnPlatform(["common", "server"], () => {
      this.log("reloading..");
      this.reload(); //
    });
  }

  installExpress(@Plugin() em: ExpressModule) {
    em.preBuilders.push(app => {
      app.use((req, res, next) => {
        this.log(`HTTP ${req.method} ${req.path}`);
        next();
      });
    });
  }
}
