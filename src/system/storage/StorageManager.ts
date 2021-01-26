import RequestSession from "@dabsi/modules/session/RequestSession";
import { DataResolver } from "@dabsi/system/storage/DataResolver";
import Storage from "@dabsi/system/storage/Storage";
import { DataRow } from "@dabsi/typedata/row";
import { Inject, Injectable } from "@dabsi/typedi";
import { StorageFile } from "./entities/StorageFile";

@Injectable()
export default class StorageManager {
  constructor(
    @Inject() protected storage: Storage,
    @Inject() protected dataResolver: DataResolver,
    @Inject(RequestSession) protected session: DataRow<RequestSession>
  ) {}

  async upload(
    tag: string,
    type: string,
    buffer: Buffer
  ): Promise<DataRow<StorageFile>> {
    const files = this.dataResolver.getSource(StorageFile);
    const { url } = await this.storage.upload(tag, type, buffer);
    return files.insert({
      url,
      session: this.session,
    });

    // n-sessions timeout: 0
    // n-unused resouces: 2

    // resouces
  }
}
