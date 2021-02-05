export enum StorageDeleteResult {
  DELETED,
  INVALID_URL,
  RESOURCE_BUSY,
}
export type StorageUploadResult = { url: string };

export default abstract class Storage {
  abstract upload(
    tag: string,
    type: string,
    buffer: Buffer
  ): Promise<StorageUploadResult>;

  abstract delete(url: string): Promise<StorageDeleteResult>;
}
