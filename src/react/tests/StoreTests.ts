import {Store} from "../utils/Store";

class Msg {
    constructor(public text, public comments: Msg[] = []) {
    }
}

class State {
    title = "";
    subTitle = "";
    msgs = [
        new Msg("hello")
    ];
    msg = new Msg("hello");
}

let state: State;
let store = new Store(() => state, callback => {
    state = callback(state);
});

beforeEach(() => {
    state = new State();
});

it('assign', async () => {
    const nextState = {title: "hello", subTitle: "world"};
    await store.assign(nextState);
    expect(state).toEqual(jasmine.objectContaining(nextState));
});

it("assign at", async () => {
    await store.at("msg").assign({text: "world"});
    expect(state.msg.text).toEqual("world");
});

it('push at array', async () => {
    await store.at("msgs").add(new Msg("world"));
    expect(state.msgs).toEqual(jasmine.arrayContaining([
        jasmine.objectContaining({text: "world"})
    ]))
});

it('push at object', async () => {
    await store.at("msg").at("comments").add(new Msg("world"));
    expect(state.msg.comments).toEqual(jasmine.arrayContaining([
        jasmine.objectContaining({text: "world"})
    ]))
});

it('push at object in array', async () => {
    await store.at("msgs").at(0).at("comments").add(new Msg("world"));
    expect(state.msgs[0].comments).toEqual(jasmine.arrayContaining([
        jasmine.objectContaining({text: "world"})
    ]))
});
