import {AnyInput, Input} from "../input/Input";
import {InputMap} from "../input/InputMap";
import {NoRpc} from "../NoRpc";
import {connectToRpc, RpcConnectionType} from "../Rpc";
import objectContaining = jasmine.objectContaining;

export function TestInput(
    {
        value = null,
        error = undefined,
        element = null,
        remoteConfig = null,
        controller = NoRpc,
        loadAndCheck,
        getElement,
    }: {
        value?, error?, element?, remoteConfig?, controller?, options?,
        loadAndCheck?,
        getElement?

    }) {
    return Input({
        static: {},
        controller,
        createContext: config => {
            return {
                getControllerConfig: () => remoteConfig,
                getElement: getElement || (() => element),
                loadAndCheck: loadAndCheck || (data => {
                    return error ? {error} : {value}
                }),
            }
        }
    })

}


describe('InputMap', () => {
    it('expected to value', async () => {
        expect(await InputMap({
                hello: TestInput({
                    loadAndCheck: data => ({value: data.toUpperCase()})
                })
            }).getContext({hello: null}).loadAndCheck({hello: "world"})
        ).toEqual({value: {hello: "WORLD"}});
    });
    it('expected to error', async () => {
        expect(await InputMap({
                hello: TestInput({
                    loadAndCheck: data => ({error: data.toUpperCase()})
                })
            })
                .getContext({hello: null})
                .loadAndCheck({hello: "world"})
        ).toEqual({error: {hello: "WORLD"}});
    });
    it('expected to element', async () => {
        expect(await InputMap({
                hello: TestInput({
                    getElement: () => "world"
                })
            }).getContext({hello: null}).getElement()
        ).toEqual({hello: "world"});
    });
});


testm(__filename, () => {

    it('expected to valid check', async () => {
        await testCheck(() => null, null);
    });


    it('expected to validate data', async () => {
        await test({
            async load(config, data: string) {
                return data.toUpperCase()
            }
        }).check("hello");
    });

    it('expected to check value', async () => {
        await test({
            async check(config, value) {
                expect(value).toEqual("HELLO")
            },
            async load(config, text: string) {
                return text.toUpperCase()
            }
        }).check("hello");
    });

    async function testCheck(check, expected) {
        expect(await test({
            async check() {
                return check();
            }
        }).check(null)).toEqual(objectContaining(expected));

    }

    function test({config = null, ...props}): RpcConnectionType<AnyInput> {
        return connectToRpc(Input({
            static: {},
            controller: NoRpc,
            createContext: () => ({
                getControllerConfig: () => null,
                loadAndCheck: () => ({value: null}),
                getElement: () => null,
            }),
            ...props
        }), config)
    }

});

