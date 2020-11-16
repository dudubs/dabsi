import { Reactor } from "./Reactor";

testm(__dirname, () => {
  it("expect to listen", () => {
    let isEmitted = false;
    let isListening = true;

    class MyEvent {
      constructor() {}
    }
    class MyOtherEvent {
      constructor() {}
    }
    const r = new Reactor();

    const unlisten = r.listen(MyEvent, event => {
      expect(event).toBeInstanceOf(MyEvent);
      if (isEmitted && !isListening) {
        fail("unlisten() didn't worked");
      }
      isEmitted = true;
      isListening = false;
      unlisten();
    });

    r.emit(new MyOtherEvent());
    r.emit(new MyEvent());
    r.emit(new MyEvent());
  });
});
