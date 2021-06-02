import {
  StorageDeleteResult,
  StorageUploadResult,
  Storage,
} from "@dabsi/system/storage/Storage";

export class TestStorage implements Storage {
  counter = 0;
  upload(
    tag: string,
    type: string,
    buffer: Buffer
  ): Promise<StorageUploadResult> {
    return Promise.resolve({
      url: `test://${tag}_${++this.counter}.${type}`,
    });
  }
  delete(url: string): Promise<StorageDeleteResult> {
    return Promise.resolve(StorageDeleteResult.DELETED);
  }
}
