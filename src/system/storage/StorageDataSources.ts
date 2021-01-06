import DataSourceResolver from "@dabsi/modules/data/DataSourceResolver";
import { StorageFile } from "./entities/StorageFile";

export default DataSourceResolver({
  files: StorageFile,
});
