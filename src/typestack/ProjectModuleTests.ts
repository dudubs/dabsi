import copydir from "copy-dir";
import path from "path";
import { DABSI_PATH } from "../index";

copydir.sync(
  path.join(DABSI_PATH, "test-projects", "test-project"),
  path.resolve(DABSI_PATH, "test-project")
);
