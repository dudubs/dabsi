export class InstanceEmitter {
  protected instanceCallbacksMap = new Map<
    Function,
    ((instance: any) => void)[]
  >();

  protected instanceMap = new Map<Function, any>();

  listen(target: Function, callback: (instance: any) => void) {
    const instance = this.instanceMap.get(target);
    if (instance) {
      callback(instance);
      return;
    }
    this.instanceCallbacksMap.touch(target, () => []).push(callback);
  }

  emit(instance) {
    this.instanceMap.set(instance.constructor, instance);
    const callbacks = this.instanceCallbacksMap.get(instance.constructor);
    if (!callbacks) return;
    for (const callback of callbacks) {
      callback(instance);
    }
  }
}
