import { DABSI_ROOT_DIR } from "@dabsi/index";
import fs, { existsSync, writeFileSync } from "fs";
import * as path from "path";
import { Debounce } from "@dabsi/common/async/Debounce";

export default function watchReloadFile(platform, callback) {
  const debounce = Debounce(200);

  const reloadFileName = path.join(
    DABSI_ROOT_DIR,
    "reload." + platform + ".lock"
  );

  if (!existsSync(reloadFileName)) {
    writeFileSync(reloadFileName, "");
  }
  fs.watch(reloadFileName, async () => {
    if (await debounce()) {
      callback();
    }
  });
}
