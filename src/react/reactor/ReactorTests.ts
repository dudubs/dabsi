import { Emittable, Reactor } from "./Reactor";

testm(__dirname, () => {
  it("expect to listen", () => {
    let isEmitted = false;
    let isListening = true;

    const MyEvent = Emittable();
    const MyOtherEvent = Emittable();
    const r = new Reactor();

    const unlisten = r.listen(MyEvent, event => {
      if (isEmitted && !isListening) {
        fail("unlisten() didn't worked");
      }
      isEmitted = true;
      isListening = false;
      unlisten();
    });

    r.emit(MyOtherEvent, 1);
    r.emit(MyEvent, 1);
    r.emit(MyEvent, 2);
  });
});
