import Debounce from "@dabsi/common/async/Debounce";
import { MapFactory } from "@dabsi/common/map/mapFactory";
import { DABSI_WORKSPACE_DIR } from "@dabsi/env";
import fs from "fs";
import path from "path";
const getWatchdog = MapFactory((name: string) => {
  const callbacks: { (): void }[] = [];

  const debounce = new Debounce(400);
  fs.watch(path.join(DABSI_WORKSPACE_DIR, `reload.${name}.lock`), async () => {
    if (await debounce.wait()) {
      for (const callback of callbacks) {
        callback();
      }
    }
  });
  return { callbacks };
});
export default function watchOnPlatform(names: string[], callback: () => void) {
  for (const name of names) {
    getWatchdog(name).callbacks.push(callback);
  }
}
