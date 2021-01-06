import fs from "fs";
import FileId from "@dabsi/system/storage/FileId";
import Storage, {
  StorageDeleteResult,
  StorageUploadResult,
} from "@dabsi/system/storage/Storage";
import moment from "moment";
import path from "path";
import { joinUrl } from "@dabsi/common/string/joinUrl";
let counter = 0;

export class LocalStorage extends Storage {
  constructor(protected dir: string, protected url: string) {
    super();
  }
  async upload(
    tag: string,
    type: string,
    buffer: Buffer
  ): Promise<StorageUploadResult> {
    const baseName = tag + "-" + FileId() + "." + type;
    const dir = path.join(this.dir, moment().format("YY-MM-DD"));
    await fs.promises.mkdir(dir);
    const fileName = path.join(dir, baseName);
    await fs.promises.writeFile(fileName, buffer);

    return { url: joinUrl(this.url, dir, fileName) };
  }
  async delete(url: string): Promise<StorageDeleteResult> {
    if (!url.startsWith(this.url)) return "INVALID_URL";
    const fileName = path.join(
      this.dir,
      url.slice(this.url.length).replace(/^[\\\/]/, "")
    );
    try {
      await fs.promises.access(fileName);
    } catch {
      return "DELETED";
    }
    try {
      await fs.promises.unlink(fileName);
    } catch {
      return "RESOURCE_BUSY";
    }
    return "DELETED";
  }
}
