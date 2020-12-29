import { Logger } from "@dabsi/logging/Logger";

export type ObjectPoolOptions = {
  maxSize?: number;
  releaseTimeout?: number;
  acquireTimeout?: number;
};

export interface ObjectPool<T> {
  release(instance: T): Promise<void>;
  acquire(): Promise<T>;
}
