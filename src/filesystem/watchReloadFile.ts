import Debounce from "@dabsi/common/async/Debounce";
import { DABSI_WORKSPACE_DIR } from "@dabsi/env";
import fs, { existsSync, writeFileSync } from "fs";
import * as path from "path";

export default function watchReloadFile(platform, callback) {
  const debounce = new Debounce(200);

  const reloadFileName = path.join(
    DABSI_WORKSPACE_DIR,
    "reload." + platform + ".lock"
  );

  if (!existsSync(reloadFileName)) {
    writeFileSync(reloadFileName, "");
  }
  fs.watch(reloadFileName, async () => {
    if (await debounce.wait()) {
      callback();
    }
  });
}
