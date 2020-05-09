import {Lang} from "../Lang";
import {LangView} from "../LangView";
import objectContaining = jasmine.objectContaining;


const HelloMsg = Lang`HELLO_${"name"}!`;

it('expect to correct template key', () => {
    expect(HelloMsg.token).toEqual('HELLO_{name}!');
});


it('expect to react element', () => {
    expect(HelloMsg({name: "World"})).toEqual(objectContaining({
        type: LangView,
        props: objectContaining({
            token: HelloMsg.token,
            props: objectContaining({
                name: "World"
            })
        })
    }));
});

it('expect to template entry', () => {
    const [token, formatter] = HelloMsg`Hello ${"name"}!`;
    expect(formatter({name: "World"})).toEqual("Hello World!");
    expect(token).toEqual(HelloMsg.token);
});
