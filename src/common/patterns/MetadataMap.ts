export default class MetadataMap<V, T extends object = any> {
  protected _map = new WeakMap();

  get(target: T): Record<any, V | undefined> {
    return this._map.touch(target, () => {
      const base = Object.getPrototypeOf(target);
      if (base === Object.prototype) {
        return <any>{};
      }
      return Object.create(this.get(base));
    });
  }
}
