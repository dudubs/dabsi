import { Store } from "@dabsi/store";

testm(__filename, () => {
  // getState, setState

  const initState = {
    keys: new Set<string>(),
    flag: false,
    counter: 0,
  };
  let state: typeof initState;

  const store = new Store<typeof initState>(
    () => state,
    getNextState => {
      state = getNextState(state);
    }
  );

  beforeEach(() => {
    state = initState;
  });

  it("update", () => {
    expect(store.update(s => ({ ...s, flag: true })).state.flag).toBeTrue();
  });
  it("update key", () => {
    expect(store.update("counter", c => c + 1).state.counter).toEqual(1);
    expect(store.update("counter", c => c + 1).state.counter).toEqual(2);
  });
  it("toggle flag", () => {
    expect(store.toggle("flag").state.flag).toBeTrue();
  });
  it("toggle set", () => {
    store.at("keys").toggle("x");
    expect([...state.keys]).toContain("x");
    store.at("keys").toggle("x");
    expect([...state.keys]).not.toContain("x");
  });
});
