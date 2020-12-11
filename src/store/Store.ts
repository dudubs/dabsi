export type SetState<T> = (getNextState: GetNextState<T>) => void;

export type GetNextState<T> = (state: T) => T;

export class Store<T> {
  constructor(public getState: () => T, public setState: SetState<T>) {}

  get state(): T {
    return this.getState();
  }
  get store(): Store<T> {
    return this;
  }
}
