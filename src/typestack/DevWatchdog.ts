import { FSWatcher, watch } from "fs";
import { join } from "path";
import { Inject } from "../typedi/Inject";
import { Module } from "../typedi/Module";
import { DevModule } from "./DevModule";
import { ProjectModule } from "./ProjectModule";

export type WatchdogExclude = (path: string) => boolean;
export type WatchdogEvent = { filename; event };

export type WatchdogCallback = (events: WatchdogEvent[]) => void;

@Module()
export class DevWatchdog {
  exclude: WatchdogExclude[] = [];
  paths: string[] = [];

  protected watchers: FSWatcher[] = [];
  protected timeout: ReturnType<typeof setTimeout> | null = null;
  protected events: WatchdogEvent[] = [];

  protected listeners = new Set<WatchdogCallback>();

  constructor(
    @Inject() devModule: DevModule,
    @Inject() projectModule: ProjectModule
  ) {
    devModule.push({
      asParent: () => {
        this.paths.push(...projectModule.paths.map(path => join(path, "src")));
        this.listen(() => {
          devModule.reload();
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

  run() {
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
    for (let path of this.paths) {
      this.watchers.push(
        watch(path, { recursive: true }, (event, filename) => {
          for (let exclude of this.exclude) {
            if (exclude(filename)) return;
          }
          this.events.push({ event, filename });
          this.timeout && clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            const { events } = this;
            this.events = [];
            for (let callback of this.listeners) {
              callback(events);
            }
          }, 100);
        })
      );
    }
  }
}
