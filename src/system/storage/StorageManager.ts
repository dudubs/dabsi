import { Type } from "@dabsi/common/typings2/Type";

import { RequestSession } from "@dabsi/modules/session/module";
import { DataSourceFactory2 } from "@dabsi/modules2/DataSourceFactory2";
import { Storage } from "@dabsi/system/storage/Storage";
import { DataInsertRow } from "@dabsi/typedata/value";
import { Injectable } from "@dabsi/typedi";
import { StorageFile } from "./entities/StorageFile";

@Injectable()
export default class StorageManager {
  constructor(
    protected storage: Storage,
    protected getDataSource: DataSourceFactory2,
    protected session: RequestSession
  ) {}

  async upload<T extends StorageFile = StorageFile>(
    tag: string,
    type: string,
    buffer: Buffer,
    entityType?: Type<T>,
    entityData?: DataInsertRow<T>
  ): Promise<{ url: string; key: string }> {
    const files = this.getDataSource(
      (entityType || StorageFile) as typeof StorageFile
    );
    const { url } = await this.storage.upload(tag, type, buffer);
    return {
      url,
      key: await files.insertKey({
        ...entityData,
        url,
        session: this.session.$key,
      }),
    };

    // n-sessions timeout: 0
    // n-unused resouces: 2

    // resouces
  }
}
