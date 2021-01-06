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
    const dateDir = moment().format("YY-MM-DD");
    const fileDir = path.join(this.dir, dateDir);
    await fs.promises.mkdir(fileDir, { recursive: true });
    const fileName = path.join(this.dir, dateDir, baseName);
    await fs.promises.writeFile(fileName, buffer);

    return { url: joinUrl(this.url, dateDir, baseName) };
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
      return "INVALID_URL";
    }
    try {
      await fs.promises.unlink(fileName);
    } catch {
      return "RESOURCE_BUSY";
    }
    return "DELETED";
  }
}
