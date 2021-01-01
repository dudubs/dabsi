import { StorageFile } from "@dabsi/system/storage/entities/StorageFile";
import DataSources from "@dabsi/typedata/DataSources";

export default class extends DataSources({
  files: StorageFile,
}) {}
