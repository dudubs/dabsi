import { Constructor } from "@dabsi/common/typings2/Constructor";
import { Type } from "@dabsi/common/typings2/Type";
import { DataContext } from "@dabsi/modules/data/context";
import RequestSession from "@dabsi/modules/session/RequestSession";
import Storage from "@dabsi/system/storage/Storage";
import { DataRow } from "@dabsi/typedata/row";
import { DataInsert } from "@dabsi/typedata/value";
import { Inject, Injectable } from "@dabsi/typedi";
import { StorageFile } from "./entities/file";

@Injectable()
export default class StorageManager {
  constructor(
    protected storage: Storage,
    protected data: DataContext,
    @Inject(RequestSession) protected session: DataRow<RequestSession>
  ) {}

  async upload<T extends StorageFile = StorageFile>(
    tag: string,
    type: string,
    buffer: Buffer,
    entityType?: Type<T>,
    entityData?: DataInsert<T>
  ): Promise<{ url: string; key: string }> {
    const files = this.data.getSource(
      (entityType || StorageFile) as typeof StorageFile
    );
    const { url } = await this.storage.upload(tag, type, buffer);
    return {
      url,
      key: await files.insertKey({
        ...entityData,
        url,
        session: this.session,
      }),
    };

    // n-sessions timeout: 0
    // n-unused resouces: 2

    // resouces
  }
}
