import Lazy from "@dabsi/common/patterns/Lazy";
import { CliArgument, CliCommand } from "@dabsi/typecli";
import { Module } from "@dabsi/typemodule";
import { AsyncJsonFile } from "./AsyncJsonFile";

export interface StartArgs {
  force: boolean;
  f: boolean;
  disablePid?: boolean;
}
export interface StopArgs {}

const PID_FILENAME = "ts-server.pid";

@Module({})
export class ServerModule2 {
  readonly starters: ((args: Partial<StartArgs>) => Promise<void>)[] = [];
  readonly stoppers: ((args: Partial<StopArgs>) => Promise<void>)[] = [];

  protected _pidFilename = PID_FILENAME;

  @Lazy() protected get _pidFile() {
    return new AsyncJsonFile<{ pid: number }>(this._pidFilename);
  }

  @CliArgument(y => y.option("pidfile", { type: "string" }))
  configure({ pidfile: pidFilename = this._pidFilename }) {
    this._pidFilename = pidFilename;
  }

  @CliCommand("start", y => y.option("disable-pid", { type: "boolean" }))
  async start(args: Partial<StartArgs> = {}) {
    if (!args.disablePid) {
      const runningPid = (await this._pidFile.read())?.pid;
      if (runningPid) {
        if (!(args.f || args.force)) {
          log.error(`Server is already started (pid ${runningPid})`);
          return;
        }
        tryToKill(runningPid);
      }

      process.on("exit", async () => {
        await this._pidFile.update(value => {
          if (value?.pid === process.pid) {
            return null;
          }
          return value;
        });
      });
    }

    await Promise.all([
      args.disablePid ? null : this._pidFile.write({ pid: process.pid }),
      Promise.all(this.starters.map(starter => starter(args))),
    ]);
  }

  @CliCommand("stop")
  async stop(args: Partial<StopArgs> = {}) {
    const runningPid = (await this._pidFile.read())?.pid;
    if (!runningPid) return;
    tryToKill(runningPid);

    await Promise.all(this.stoppers.map(stopper => stopper(args)));
  }
}

function tryToKill(pid: number) {
  try {
    process.kill(pid);
  } catch {
    //
  }
}
