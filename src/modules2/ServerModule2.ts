import { AsyncProcess2 } from "@dabsi/common/async/AsyncProcess2";

import Lazy from "@dabsi/common/patterns/Lazy";
import { RequestBuilder } from "@dabsi/modules2/RequestBuilder";
import { CliArgument, CliCommand } from "@dabsi/typecli";
import { Resolver, ResolverMap } from "@dabsi/typedi";
import { Module } from "@dabsi/typemodule";
import { AsyncJsonFile } from "./AsyncJsonFile";

export interface StartArgs {
  force: boolean;
  f: boolean;
  disablePid?: boolean;
  port?: number;
}
export interface StopArgs {}

const PID_FILENAME = "ts-server.pid";

class RequestProcess extends AsyncProcess2 {}

@Module({})
export class ServerModule2 {
  readonly starters: ((args: Partial<StartArgs>) => Promise<void>)[] = [
    async args => {},
  ];
  readonly stoppers: ((args: Partial<StopArgs>) => Promise<void>)[] = [];

  protected _pidFilename = PID_FILENAME;

  readonly request = new RequestBuilder();

  @Lazy() protected get _pidFile() {
    return new AsyncJsonFile<{ pid: number }>(this._pidFilename);
  }

  @CliArgument(y => y.option("pidfile", { type: "string" }))
  configure({ pidfile: pidFilename = this._pidFilename }) {
    this._pidFilename = pidFilename;
  }

  @CliCommand("start", y =>
    y
      .option("disable-pid", { type: "boolean" })
      .option("port", { type: "number", alias: "p", default: 7777 })
  )
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

  processRequest(
    context: ResolverMap,
    callback: (context: ResolverMap) => Promise<void>
  ): Promise<void> {
    const process = new AsyncProcess2();

    return this.request.process(
      Resolver.Context.assign(context, [process]),
      async context => {
        await process.waitFor(() => callback(context));
      }
    );
  }
}

function tryToKill(pid: number) {
  try {
    process.kill(pid);
  } catch {
    //
  }
}

export class ServerRequestBuilder extends Resolver(
  [ServerModule2],
  x => x.request
) {}
