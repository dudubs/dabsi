export type BuilderCallback<T> = (o: T) => void;

export class Builder<T> {
  protected builders: BuilderCallback<T>[] = [];

  push(callback: BuilderCallback<T>) {
    this.builders.push(callback);
  }

  build(o: T) {
    for (let builder of this.builders) {
      builder(o);
    }
  }
}
