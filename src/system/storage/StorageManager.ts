import { StorageFile } from "./entities/StorageFile";
import Storage from "@dabsi/system/storage/Storage";
import StorageDataSources from "@dabsi/system/storage/StorageDataSources";
import { DataRow } from "@dabsi/typedata/DataRow";
import { Inject, Injectable, ResolverType } from "@dabsi/typedi";

@Injectable()
export default class StorageManager {
  constructor(
    @Inject() protected storage: Storage,
    @Inject(StorageDataSources)
    protected sources: ResolverType<typeof StorageDataSources>
  ) {}

  async upload(
    tag: string,
    type: string,
    buffer: Buffer
  ): Promise<DataRow<StorageFile>> {
    const { url } = await this.storage.upload(tag, type, buffer);
    return this.sources.files.insert({
      url,
      countRefs: 0,
      time: new Date().getTime(),
    });
  }
}
