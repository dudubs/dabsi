import * as fs from "fs";
import { FSWatcher } from "fs";
import { Debounce } from "../common/async/Debounce";
import { mapObjectToArray } from "../common/object/mapObjectToArray";
import { Inject, Module } from "../typedi";
import { DevModule } from "./DevModule";
import { ProjectModule } from "./ProjectModule";

export type WatchdogExclude = (path: string) => boolean;
export type WatchdogEvent = { filename; event };

export type WatchdogCallback = (events: WatchdogEvent[]) => void;

@Module()
export class DevWatchdogModule {
  exclude: WatchdogExclude[] = [(fn) => /View.tsx?$/.test(fn)];
  paths: string[] = [];

  protected watchers: FSWatcher[] = [];
  protected events: WatchdogEvent[] = [];

  protected listeners = new Set<WatchdogCallback>();

  log = this.mDev.log.get("WATCHDOG");

  constructor(
    @Inject() protected mDev: DevModule,
    @Inject() mProjectModule: ProjectModule
  ) {
    mDev.push({
      asChild: () => {},
      asParent: async () => {
        await mProjectModule.init();
        this.paths.push(
          ...mapObjectToArray(mProjectModule.projectInfoMap, (pi) => pi.srcDir)
        );
        this.listen(() => {
          mDev.reload();
        });
        this.run();
      },
    });
  }

  listen(callback): () => void {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  }

  protected run() {
    this.start();
    process.on("SIGINT", () => {
      this.stop();
    });
  }

  protected stop() {
    for (let watcher of this.watchers) {
      watcher.close();
    }
    this.watchers = [];
  }

  protected start() {
    const debounce = Debounce(100);
    for (let path of this.paths) {
      this.log.info(() => `watching ${path}`);
      this.watchers.push(
        fs.watch(path, { recursive: true }, async (event, filename) => {
          for (let exclude of this.exclude) {
            if (exclude(filename)) return;
          }
          this.events.push({ event, filename });

          if (await debounce()) {
            const { events } = this;
            this.events = [];
            for (let callback of this.listeners) {
              callback(events);
            }
          }
        })
      );
    }
  }
}
