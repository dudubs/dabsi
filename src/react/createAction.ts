export function createAction<T>(name?: string): new (value: T) => T {
  name &&
    Object.defineProperty(Action, "name", {
      get() {
        return name;
      },
    });

  return <any>Action;

  function Action(value) {
    return Object.setPrototypeOf({ constructor: Action }, value);
  }
}
