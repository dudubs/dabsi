import ProjectModule from "@dabsi/modules/ProjectModule";
import ServerModule from "@dabsi/modules/ServerModule";
import watchOnPlatform from "@dabsi/modules/watchOnPlatform";
import { CliCommand } from "@dabsi/typecli";
import { Module } from "@dabsi/typemodule";
import { ModuleRunner, ModuleTarget } from "@dabsi/typemodule/ModuleRunner";
import getTypestackCliArgs from "@dabsi/typestack/getTypestackCliArgs";
import { ChildProcess, spawn } from "child_process";

@Module({
  cli: "server",
})
export default class ServerDevModule {
  protected _devProcess: ChildProcess | null = null;

  constructor(
    protected projectModule: ProjectModule,
    protected moduleRunner: ModuleRunner
  ) {}

  reload() {
    this._devProcess?.kill();
    console.log([process.argv[0], getTypestackCliArgs(["server", "start"])]);

    this._devProcess = spawn(
      process.argv[0],
      getTypestackCliArgs(["server", "start"]),
      {
        stdio: "inherit",
        cwd: this.projectModule.settings.directory,
      }
    );
  }

  @CliCommand("start-dev") startDev() {
    this.reload();
    watchOnPlatform(["common", "server"], () => {
      this.reload();
    });
  }
}
