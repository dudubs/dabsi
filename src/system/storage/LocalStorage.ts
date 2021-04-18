import { joinUrl } from "@dabsi/common/string/joinUrl";
import generateFileId from "@dabsi/system/storage/generateFileId";
import {
  StorageDeleteResult,
  Storage,
  StorageUploadResult,
} from "@dabsi/system/storage/Storage";
import fs from "fs";
import moment from "moment";
import path from "path";

export class LocalStorage implements Storage {
  constructor(readonly directory: string, protected url: string) {}
  async upload(
    tag: string,
    type: string,
    buffer: Buffer
  ): Promise<StorageUploadResult> {
    const baseName = tag + "-" + generateFileId() + "." + type;
    const dateDir = moment().format("YY-MM-DD");
    const fileDir = path.join(this.directory, dateDir);
    await fs.promises.mkdir(fileDir, { recursive: true });
    const fileName = path.join(this.directory, dateDir, baseName);
    await fs.promises.writeFile(fileName, buffer);

    return { url: joinUrl(this.url, dateDir, baseName) };
  }
  async delete(url: string): Promise<StorageDeleteResult> {
    if (!url.startsWith(this.url)) return StorageDeleteResult.INVALID_URL;
    const fileName = path.join(
      this.directory,
      url.slice(this.url.length).replace(/^[\\\/]/, "")
    );
    try {
      await fs.promises.access(fileName);
    } catch {
      return StorageDeleteResult.INVALID_URL;
    }
    try {
      await fs.promises.unlink(fileName);
    } catch {
      return StorageDeleteResult.RESOURCE_BUSY;
    }
    return StorageDeleteResult.DELETED;
  }
}
