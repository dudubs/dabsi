export enum StorageDeleteResult {
  DELETED,
  INVALID_URL,
  RESOURCE_BUSY,
}
export type StorageUploadResult = { url: string };

export class Storage {
  upload!: (
    tag: string,
    type: string,
    buffer: Buffer
  ) => Promise<StorageUploadResult>;

  delete!: (url: string) => Promise<StorageDeleteResult>;
}
