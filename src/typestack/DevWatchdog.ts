import { Debounce } from "@dabsi/common/async/Debounce";
import watch from "@dabsi/filesystem/watch";
import { FSWatcher } from "fs";

export type WatchdogExclude = (path: string) => boolean;
export type WatchdogEvent = { filename; event };

export type WatchdogCallback = (events: WatchdogEvent[]) => void;

export class DevWatchdog {
  exclude: WatchdogExclude[] = [fn => /View.tsx?$/.test(fn)];
  paths: string[] = [];

  protected watchers: FSWatcher[] = [];
  protected events: WatchdogEvent[] = [];

  protected listeners = new Set<WatchdogCallback>();

  log = log.get("DEV").get("WATCHDOG");

  listen(callback): () => void {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  }

  protected run() {
    this.watch();
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

  watch() {
    const debounce = Debounce(100);
    for (let path of this.paths) {
      this.log.info(() => `watching ${path}`);
      this.watchers.push(
        watch(path, { recursive: true }, async (event, filename) => {
          for (let exclude of this.exclude) {
            if (filename && exclude(filename)) return;
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
